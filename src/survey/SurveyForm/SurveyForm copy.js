// SurveyForm.js
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore'; 
import { Progress } from "@material-tailwind/react";
import { useParams, useNavigate } from 'react-router-dom';
import Question1 from '../Questions/Question1';
import Question2 from '../Questions/Question2';
import Question3 from '../Questions/Question3';
import Question4 from '../Questions/Question4';
import Question5 from '../Questions/Question5';
import ImageSelection from '../ImageSelection/ImageSelection';
import ImageComparison from '../ImageComaprison/ImageComparison';
import WelcomePage from '../StartEndPages/WelcomePage'; 
import EndingPage from '../StartEndPages/EndingPage';
import ContinuePage from '../Questions/ContinuePage';
import { v4 as uuidv4 } from 'uuid';
import RankQuestion from '../Questions/RankQuestion';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5siaFnxhtfEbw1FaKuX8GkEQyN5rb6a0",
  authDomain: "sidewalk-survey-f7904.firebaseapp.com",
  projectId: "sidewalk-survey-f7904",
  storageBucket: "sidewalk-survey-f7904.appspot.com",
  messagingSenderId: "116996397844",
  appId: "1:116996397844:web:10d973cb146b348c040001",
  measurementId: "G-3MC54XMWQD"
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const TOTAL_STEPS = 14;
const MOBILITYAID_STEP = 5;

const SurveyComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [surfaceSelection, setSurfaceSelection] = useState({surfaceA: [], surfaceB: []});
  const [obstacleSelection, setObstacleSelection] = useState({obstacleA: [], obstacleB: []});
  const [noCurbSelection, setNoCurbSelection] = useState({noCurbA: [], noCurbB: []});
  const [imageComparisons, setImageComparisons] = useState([]);
  const [totalSteps, setTotalSteps] = useState(TOTAL_STEPS);
  const [sessionId, setSessionId] = useState(uuidv4()); 
  const [userId, setUserId] = useState(uuidv4()); 
  const [continueUrl, setContinueUrl] = useState('');

  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    let steps = 14; // base number of steps
    setTotalSteps(steps);
  }, [/* dependencies that might change the number of steps, e.g., answers */]);

  const progressValue = (currentStep / totalSteps) * 100;


  const startSurvey = () => {
    setCurrentStep(1); // Start the survey
  };
  
  const [answers, setAnswers] = useState({
    name: '',
    email: '',
    mobilityAid: '',
    sidewalkBarriers: '',
    answeredMobilityAids: []
  });

  // for resuming the survey
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const docRef = doc(firestore, "surveyAnswers", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserId(data.userId);
          setSessionId(data.sessionId);
          setAnswers(data);
          // set the current mobility aid
          if (data.answeredMobilityAids && data.answeredMobilityAids.length > 0) {
            const remainingOptions = data.mobilityAidOptions.mobilityAidOptions.filter(option => !data.answeredMobilityAids.includes(option));
            handleMobilityAidChange(remainingOptions[0]);
          }

          setCurrentStep(MOBILITYAID_STEP);
          setSurfaceSelection(data.surfaceSelection || { surfaceA: [], surfaceB: [] });
          setObstacleSelection(data.obstacleSelection || { obstacleA: [], obstacleB: [] });
          setNoCurbSelection(data.noCurbSelection || { noCurbA: [], noCurbB: [] });
          setImageComparisons(data.imageComparisons || []);
        } else {
          console.log("No such document!");
        }
      }
    };
    fetchData();
  }, [id]);

const surfaceCropsData = [
  {
      "City": "seattle",
      "LabelID": 111698,
      "LabelTypeID": 4,
      "PanoID": "8UyaKl2zh2BE6ZwRTCxkyA",
      "Heading": 227.6875,
      "Pitch": -35,
      "Zoom": 1,
      "FOV": 90,
      "CanvasX": 326,
      "CanvasY": 216
  },
  {
      "City": "seattle",
      "LabelID": 205972,
      "LabelTypeID": 4,
      "PanoID": "EwjRCeSEVWFQGRnqsXM_DA",
      "Heading": 205.7209777832,
      "Pitch": -22.125,
      "Zoom": 1,
      "FOV": 90,
      "CanvasX": 486,
      "CanvasY": 192
  },

  {
    "City": "seattle",
    "LabelID": 194344,
    "LabelTypeID": 4,
    "PanoID": "JWaaynPQwfIX3QmAPpA8gg",
    "Heading": 210.3660736084,
    "Pitch": -6.4642858505,
    "Zoom": 2,
    "FOV": 45,
    "CanvasX": 536,
    "CanvasY": 242
},
{
    "City": "seattle",
    "LabelID": 208040,
    "LabelTypeID": 4,
    "PanoID": "YDaym1DloFZnBdGoaDUyDQ",
    "Heading": 311.375,
    "Pitch": -35,
    "Zoom": 1,
    "FOV": 90,
    "CanvasX": 448,
    "CanvasY": 122
},

{
  "City": "seattle",
  "LabelID": 107450,
  "LabelTypeID": 4,
  "PanoID": "ibbpox2xm6Y8ZhdcWYTMHw",
  "Heading": 220.9821472168,
  "Pitch": -20.0892848969,
  "Zoom": 2,
  "FOV": 45,
  "CanvasX": 463,
  "CanvasY": 172
},
];

const obstacleCropsData = [
  {
      "City": "seattle",
      "LabelID": 169928,
      "LabelTypeID": 3,
      "PanoID": "o0Uq8GMm_BMCOxaKE1FYoQ",
      "Heading": 161.5892791748,
      "Pitch": -35,
      "Zoom": 1,
      "FOV": 90,
      "CanvasX": 216,
      "CanvasY": 146
  },
  {
      "City": "seattle",
      "LabelID": 139731,
      "LabelTypeID": 3,
      "PanoID": "tE85ocVCFwcoXIbDpQRVDQ",
      "Heading": 7.8656058311,
      "Pitch": -35,
      "Zoom": 1,
      "FOV": 90,
      "CanvasX": 318,
      "CanvasY": 203
  },
  {
      "City": "seattle",
      "LabelID": 100492,
      "LabelTypeID": 3,
      "PanoID": "Ml-OCQTY1s5k7b6DSxHZ-A",
      "Heading": 160.5535736084,
      "Pitch": -17.0982151031,
      "Zoom": 2,
      "FOV": 45,
      "CanvasX": 193,
      "CanvasY": 190
  },
  {
    "City": "seattle",
    "LabelID": 191782,
    "LabelTypeID": 3,
    "PanoID": "tSDTx7aNmeGUosgKkWJC8Q",
    "Heading": 65.796875,
    "Pitch": -3.609375,
    "Zoom": 3,
    "FOV": 23,
    "CanvasX": 361,
    "CanvasY": 328
},
{
  "City": "seattle",
  "LabelID": 214878,
  "LabelTypeID": 3,
  "PanoID": "6aS515xppGK6FIZ8i5FxnQ",
  "Heading": 133.0758972168,
  "Pitch": -14.5647325516,
  "Zoom": 1,
  "FOV": 90,
  "CanvasX": 300,
  "CanvasY": 291
}
];

  // for handling the case where the image group is empty
  useEffect(() => {
    if (currentStep === 7 && surfaceSelection.surfaceA.length < 1 ) {
      setCurrentStep(8); // Skip Surface ImageComparison A if no images
    } else if (currentStep === 8 && surfaceSelection.surfaceB.length < 1 ) {
      setCurrentStep(9); // Skip Surface ImageComparison B if no images
    }
    // Repeat the pattern for other selections
    else if (currentStep === 10 && obstacleSelection.obstacleA.length < 1) {
      setCurrentStep(11); // Skip Obstacle ImageComparison A if no images
    } else if (currentStep === 11 && obstacleSelection.obstacleB.length < 1) {
      setCurrentStep(12); // Skip Obstacle ImageComparison B if no images
    }
  }, [currentStep, surfaceSelection, obstacleSelection, noCurbSelection]);

  useEffect(() => {
    if(answers.mobilityAidOptions && answers.answeredMobilityAids &&
      answers.mobilityAidOptions.length === answers.answeredMobilityAids.length) {
      setCurrentStep(TOTAL_STEPS); 
    }
  }, [answers]);

const handleSurfaceSelectionComplete = (selection) => {
  setSurfaceSelection({surfaceA: selection.groupAImages, surfaceB: selection.groupBImages});
  setCurrentStep(currentStep + 1);
};

const handleObstacleSelectionComplete = (selection) => {
  setObstacleSelection({obstacleA: selection.groupAImages, obstacleB: selection.groupBImages});
  setCurrentStep(currentStep + 1);
};

const nextStep = () => {
  if (currentStep < TOTAL_STEPS) {
    setCurrentStep(currentStep + 1);
    // logData();
  }
};

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateAnswers = (key, value) => {
    setAnswers(prevAnswers => ({ ...prevAnswers, [key]: value }));
  };

  const handleChange = (input) => (e) => {
    setAnswers({ ...answers, [input]: e.target.value });
  }; 

  const handleMobilityAidChange = (newMobilityAid) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      mobilityAid: newMobilityAid
    }));
  };
    

  const onSelectionComplete = (data) => {
    setImageComparisons(prev => [...prev, { ...data }]);
};

const renderCurrentStep = () => {
  switch(currentStep) {
    // Questions 1-4
    case 1:
      return <Question1 
              stepNumber={currentStep} 
              nextStep={nextStep} 
              handleChange={handleChange} />;
    case 2:
      return <Question2 
              stepNumber={currentStep} 
              nextStep={nextStep} 
              previousStep={previousStep} 
              handleChange={handleChange} />;
    case 3:
      return <Question3 
              stepNumber={currentStep} 
              nextStep={nextStep} 
              previousStep={previousStep} 
              updateAnswers={updateAnswers} />;
    case 4:
      return <Question4
              stepNumber={currentStep}
              nextStep={nextStep}
              previousStep={previousStep}
              answers={answers}
              handleChange={handleChange}
            />
    case 5:
      return <Question5 
              stepNumber={currentStep} 
              nextStep={nextStep} 
              previousStep={previousStep} 
              answers={answers} 
              handleChange={handleChange} />;
    case 6: 
      return <ImageSelection 
              stepNumber={currentStep}
              answers={answers}
              nextStep={nextStep} 
              previousStep={previousStep} 
              images={surfaceCropsData}  
              onComplete={handleSurfaceSelectionComplete} />;
    case 7: // Surface ImageComparison A
      return <ImageComparison 
              key="GroupA" 
              stepNumber={currentStep} 
              answers={answers}
              images={surfaceSelection.surfaceA} 
              nextStep={nextStep} 
              previousStep={previousStep}
              onSelectionComplete={onSelectionComplete} 
              comparisonContext="surfaceAcompare" 
              onComplete={() => setCurrentStep(8)} />;
    case 8: // Surface ImageComparison B
      return <ImageComparison 
              key="GroupB" 
              stepNumber={currentStep}
              answers={answers}
              nextStep={nextStep} 
              previousStep={previousStep} 
              images={surfaceSelection.surfaceB} 
              onSelectionComplete={onSelectionComplete} 
              comparisonContext="surfaceBcompare" 
              onComplete={() => setCurrentStep(9)} />;
    case 9:
      return <ImageSelection 
              stepNumber={currentStep}
              answers={answers}
              nextStep={nextStep} 
              previousStep={previousStep} 
              images={obstacleCropsData} 
              onComplete={handleObstacleSelectionComplete} />;
    case 10:
      return <ImageComparison 
              key="GroupC" 
              stepNumber={currentStep} 
              answers={answers}
              nextStep={nextStep} 
              previousStep={previousStep}
              images={obstacleSelection.obstacleA} 
              onSelectionComplete={onSelectionComplete} 
              comparisonContext="obstacleAcompare" 
              onComplete={() => setCurrentStep(11)} />;
    case 11:
      return <ImageComparison 
              key="GroupD" 
              stepNumber={currentStep} 
              answers={answers}
              nextStep={nextStep} 
              previousStep={previousStep}
              images={obstacleSelection.obstacleB} 
              onSelectionComplete={onSelectionComplete} 
              comparisonContext="obstacleBcompare" 
              onComplete={() => setCurrentStep(12)} />;
    case 12:
      return <RankQuestion
              stepNumber={currentStep}
              nextStep={nextStep}
              previousStep={previousStep}
              answers={answers}
              updateAnswers={updateAnswers}
            />
    
    case 13: 
    
      if (answers.mobilityAidOptions.mobilityAidOptions.length == 1 ||  // if only one mobility aid option
        (answers.answeredMobilityAids && answers.answeredMobilityAids.length > 0) // if answered mobility aids exist
      ) {
        const remainingOptions = answers.mobilityAidOptions.mobilityAidOptions.filter(option => !answers.answeredMobilityAids.includes(option));
        
        if(remainingOptions.length === 1) {
          setCurrentStep(14);
          return null;
        }
      } 
      return <ContinuePage 
              answers={answers}
              handleMobilityAidChange={handleMobilityAidChange}
              previousStep={previousStep} 
              nextStep={() => {handleSubmit();}}
              yesStep={() => {setCurrentStep(5);}}
              setContinueUrl={setContinueUrl}
              logData={logMobilityAidData}
              />;
    case 14:
      return <EndingPage 
              previousStep={previousStep} 
              continueUrl={continueUrl} // pass continueUrl
              onSubmit={handleSubmit} />;

    default:
      return <WelcomePage onStart={startSurvey}/>;
  }
};

useEffect(() => {
}, [currentStep]);

const handleSubmit = async () => {
  if (currentStep < TOTAL_STEPS) {
    setCurrentStep(currentStep + 1);
  }

  let logType = 'final'; // form is submitted 
  answers.answeredMobilityAids.push(answers.mobilityAid);
  try {
    const docRef = await addDoc(collection(firestore, "surveyAnswers"), {
      sessionId, 
      userId, 
      currentStep,
      logType,
      ...answers, 
      surfaceSelection, 
      obstacleSelection, 
      noCurbSelection, 
      imageComparisons,
      timestamp: serverTimestamp(), 
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const logData = async () => {
  let logType = 'temp'; 

  try {
    const docRef = await addDoc(collection(firestore, "surveyAnswers"), {
        sessionId, 
        userId, 
        currentStep,
        logType,
        ...answers,
        surfaceSelection, 
        obstacleSelection, 
        noCurbSelection, 
        imageComparisons,
        timestamp: serverTimestamp()
      });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const logMobilityAidData = async () => {
  let logType = 'CompletedOneMobilityAid'; 
  answers.answeredMobilityAids.push(answers.mobilityAid);

  try {
    const docRef = await addDoc(collection(firestore, "surveyAnswers"), {
        sessionId, 
        userId, 
        currentStep,
        logType,
        ...answers,
        surfaceSelection, 
        obstacleSelection, 
        noCurbSelection, 
        imageComparisons,
        timestamp: serverTimestamp()
      });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};


return (
  <div>
    {currentStep > 0 && (
      <div style={{ position: 'fixed', top: 0, width: '100%', left:-4}}>
        <Progress value={progressValue} color="teal" size="sm"/>
      </div>
    )}
    {renderCurrentStep()}
  </div>
);

};

export default SurveyComponent;