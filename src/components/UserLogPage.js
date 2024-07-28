import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const UserLogPage = () => {
  const { email } = useParams();
  const [logs, setLogs] = useState([]);
  const [selectedAid, setSelectedAid] = useState(null);
  const [barrier, setBarrier] = useState(null);
  const [imageSelection, setImageSelection] = useState({});

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logsQuery = query(
          collection(db, "surveyAnswers0727"),
          where("email", "==", email),
          where("logType", "in", ["final", "CompletedOneMobilityAid"])
        );
        const querySnapshot = await getDocs(logsQuery);

        if (querySnapshot.empty) {
          console.log("No matching documents found.");
        } else {
          const logEntries = [];
          querySnapshot.forEach(doc => {
            const data = doc.data();
            logEntries.push(data);
            console.log("Fetched log data:", data); // Debugging log
          });
          setLogs(logEntries);
        }
      } catch (error) {
        console.error("Error fetching logs: ", error);
      }
    };

    if (email) {
      fetchLogs();
    }
  }, [email]);

  const handleAidClick = (aid) => {
    setSelectedAid(aid);
    setShowDetails(false); 
    const matchingLog = logs.find(log => log.mobilityAid === aid);
    if (matchingLog) {
      setBarrier(matchingLog.sidewalkBarriers || "No barrier information available");
      console.log("Selected log for aid:", matchingLog); // Debugging log
      categorizeImages(matchingLog.imageSelections || {});
    } else {
      setBarrier("No barrier information available for the selected mobility aid.");
      setImageSelection({});
    }
  };

  const categorizeImages = (imageSelections) => {
    console.log("Image Selections before categorization:", imageSelections); // Debugging log
    const categorizedImages = {};

    Object.entries(imageSelections).forEach(([group, subgroups]) => {
      if (!categorizedImages[group]) {
        categorizedImages[group] = { yes: [], no: [], unsure: [] };
      }

      const groupAImages = subgroups[`${group}A`] || [];
      const groupBImages = subgroups[`${group}B`] || [];

      const imageMap = new Map();

      groupAImages.forEach(image => {
        const key = `${image.City}-${image.LabelID}-${image.LabelTypeID}-${image.Order}`;
        imageMap.set(key, { ...image, inGroupA: true });
      });

      groupBImages.forEach(image => {
        const key = `${image.City}-${image.LabelID}-${image.LabelTypeID}-${image.Order}`;
        if (imageMap.has(key)) {
          imageMap.get(key).inGroupB = true;
        } else {
          imageMap.set(key, { ...image, inGroupB: true });
        }
      });

      imageMap.forEach((imageData) => {
        if (imageData.inGroupA && imageData.inGroupB) {
          categorizedImages[group].unsure.push(imageData);
        } else if (imageData.inGroupA) {
          categorizedImages[group].yes.push(imageData);
        } else if (imageData.inGroupB) {
          categorizedImages[group].no.push(imageData);
        }
      });
    });

    console.log("Categorized Images:", categorizedImages); // Debugging log
    setImageSelection(categorizedImages);
  };

  return (
    <div>
      <h2>Log Information for {decodeURIComponent(email)}</h2>
      {logs.length > 0 ? (
        <div>
          <p><strong>User's Mobility Aid(s):</strong></p>
          {logs[0].mobilityAidOptions && Array.isArray(logs[0].mobilityAidOptions.mobilityAidOptions) && logs[0].mobilityAidOptions.mobilityAidOptions.length > 0 ? (
            <ul>
              {logs[0].mobilityAidOptions.mobilityAidOptions.map((aid, index) => (
                <li key={index}>
                  <button onClick={() => handleAidClick(aid)}>{aid}</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No mobility aid options available.</p>
          )}
          {selectedAid && (
            <div>
              <p><strong>Viewing Logs for:</strong> {selectedAid}</p>
              <p><strong>Sidewalk Barriers:</strong> {barrier}</p>
              <ImageSelection details={imageSelection} />
            </div>
          )}
        </div>
      ) : (
        <p>Loading log data...</p>
      )}
    </div>
  );
};

const ImageSelection = ({ details }) => {
  if (!details || Object.keys(details).length === 0) return <p>No image details available.</p>;

  return (
    <div>
      <h3>Image Selection</h3>
      {Object.entries(details).map(([group, categories]) => (
        <div key={group}>
          <h4>{group}</h4>
          {['yes', 'no', 'unsure'].map(category => (
            <div key={category}>
              <h5>{category.charAt(0).toUpperCase() + category.slice(1)}</h5>
              {categories[category].length > 0 ? (
                <ul>
                  {categories[category].map((image, index) => (
                      <img 
                        src={`/crops/gsv-${image.City}-${image.LabelID}-${image.LabelTypeID}-${image.Order}.png`} 
                        alt={image["Alt-text"]}
                        style={{ width: '200px', height: 'auto' }} // Adjust size as needed
                      />
                  ))}
                </ul>
              ) : (
                <p>No images in this category.</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UserLogPage;
