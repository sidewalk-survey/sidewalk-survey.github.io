import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const UserLogPage = () => {
  const { email } = useParams();
  const [logs, setLogs] = useState([]);
  const [selectedAid, setSelectedAid] = useState(null);
  const [barrier, setBarrier] = useState(null);
  const [imageDetails, setImageDetails] = useState({});

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
            logEntries.push(doc.data());
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
    const matchingLog = logs.find(log => log.mobilityAid === aid);
    if (matchingLog) {
      setBarrier(matchingLog.sidewalkBarriers || "No barrier information available");
      setImageDetails(matchingLog.imageSelections || {});
    } else {
      setBarrier("No barrier information available for the selected mobility aid.");
      setImageDetails({});
    }
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
              <ImageDetails details={imageDetails} />
            </div>
          )}
        </div>
      ) : (
        <p>Loading log data...</p>
      )}
    </div>
  );
};

const ImageDetails = ({ details }) => {
  if (!details || Object.keys(details).length === 0) return <p>No image details available.</p>;

  return (
    <div>
      <h3>Image Details:</h3>
      {Object.entries(details).map(([group, subgroups]) => (
        <div key={group}>
          <h4>{group}</h4>
          {Object.entries(subgroups).map(([subgroup, images]) => (
            <div key={subgroup}>
              <h5>{subgroup}</h5>
              <ul>
                {images.map((image, index) => (
                    <img 
                      src={`/crops/gsv-${image.City}-${image.LabelID}-${image.LabelTypeID}-${image.Order}.png`} 
                      alt={image["Alt-text"]}
                      style={{ width: '200px', height: 'auto' }} // Adjust size as needed
                    />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UserLogPage;
