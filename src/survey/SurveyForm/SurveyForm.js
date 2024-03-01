// SurveyForm.js
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'; 
import { Progress } from "@material-tailwind/react";
import Question1 from '../Questions/Question1';
import Question2 from '../Questions/Question2';
import Question3 from '../Questions/Question3';
import Question4 from '../Questions/Question4';
import ImageSelection from '../ImageSelection/ImageSelection';
import ImageComparison from '../ImageComaprison/ImageComparison';
import ImageComparisonB from '../ImageComaprison/ImageComparisonB';
import WelcomePage from '../StartEndPages/WelcomePage'; 
import EndingPage from '../StartEndPages/EndingPage';

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

const SurveyComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [surfaceSelection, setSurfaceSelection] = useState({surfaceA: [], surfaceB: []});
  const [obstacleSelection, setObstacleSelection] = useState({obstacleA: [], obstacleB: []});
  const [noCurbSelection, setNoCurbSelection] = useState({noCurbA: [], noCurbB: []});
  const [imageComparisons, setImageComparisons] = useState([]);
  const [totalSteps, setTotalSteps] = useState(15);


  useEffect(() => {
    let steps = 8; // base number of steps
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
    sidewalkBarriers: ''
  });
  
  const surfaceImages = [
    '/img/img01.png', 
    '/img/img02.png', 
    '/img/img03.png',
    '/img/img04.png',
    '/img/img05.png',
];

const obstacleImages = [
  '/img/img01.png',
  '/img/img02.png',
  '/img/img03.png',
  '/img/img04.png',
  '/img/img05.png',
];

  // for handling the case where the image group is empty
  useEffect(() => {
    if (currentStep === 6 && surfaceSelection.surfaceA.length === 0) {
      setCurrentStep(7); // Skip Surface ImageComparison A if no images
    } else if (currentStep === 7 && surfaceSelection.surfaceB.length === 0) {
      setCurrentStep(8); // Skip Surface ImageComparison B if no images
    }
    // Repeat the pattern for other selections
    else if (currentStep === 9 && obstacleSelection.obstacleA.length === 0) {
      setCurrentStep(10); // Skip Obstacle ImageComparison A if no images
    } else if (currentStep === 10 && obstacleSelection.obstacleB.length === 0) {
      setCurrentStep(11); // Skip Obstacle ImageComparison B if no images
    }
    // Add similar checks for noCurbSelection if needed
    else if (currentStep === 12 && noCurbSelection.noCurbA.length === 0) {
      setCurrentStep(13); // Skip No Curb ImageComparison A if no images
    } else if (currentStep === 13 && noCurbSelection.noCurbB.length === 0) {
      setCurrentStep(14); // Skip No Curb ImageComparison B if no images
    }
  }, [currentStep, surfaceSelection, obstacleSelection, noCurbSelection]);

const handleSurfaceSelectionComplete = (selection) => {
  setSurfaceSelection({surfaceA: selection.groupAImages, surfaceB: selection.groupBImages});
  setCurrentStep(currentStep + 1);
};

const handleObstacleSelectionComplete = (selection) => {
  setObstacleSelection({obstacleA: selection.groupAImages, obstacleB: selection.groupBImages});
  setCurrentStep(currentStep + 1);
};

const nextStep = () => {
  if (currentStep < 7) {
    setCurrentStep(currentStep + 1);
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

  const onSelectionComplete = (data) => {
    setImageComparisons(prev => [...prev, { ...data }]);
};

const renderCurrentStep = () => {
  switch(currentStep) {
    // Questions 1-4
    case 1:
      return <Question1 nextStep={nextStep} handleChange={handleChange} />;
    case 2:
      return <Question2 nextStep={nextStep} previousStep={previousStep} handleChange={handleChange} />;
    case 3:
      return <Question3 nextStep={nextStep} previousStep={previousStep} updateAnswers={updateAnswers} />;
    case 4:
      return <Question4 nextStep={nextStep} previousStep={previousStep} answers={answers} handleChange={handleChange} />;
    case 5: // After original questions, start with surface ImageSelection
      return <ImageSelection images={surfaceImages} onComplete={handleSurfaceSelectionComplete} />;
    case 6: // Surface ImageComparison A
      return <ImageComparison images={surfaceSelection.surfaceA} onSelectionComplete={onSelectionComplete} comparisonContext="surfaceAcompare" onComplete={() => setCurrentStep(7)} />;
    case 7: // Surface ImageComparison B
      return <ImageComparisonB images={surfaceSelection.surfaceB} onSelectionComplete={onSelectionComplete} comparisonContext="surfaceBcompare" onComplete={() => setCurrentStep(8)} />;
    case 8:
      return <ImageSelection images={obstacleImages} onComplete={handleObstacleSelectionComplete} />;
    case 9:
      return <ImageComparison images={obstacleSelection.obstacleA} onSelectionComplete={onSelectionComplete} comparisonContext="obstacleAcompare" onComplete={() => setCurrentStep(10)} />;
    case 10:
      return <ImageComparisonB images={obstacleSelection.obstacleB} onSelectionComplete={onSelectionComplete} comparisonContext="obstacleBcompare" onComplete={() => setCurrentStep(11)} />;
    case 11:
      return <EndingPage previousStep={previousStep} onSubmit={handleSubmit} />;
    default:
      return <WelcomePage onStart={startSurvey}/>;
  }
};

const handleSubmit = async () => {
  try {
    const docRef = await addDoc(collection(firestore, "surveyAnswers"), {
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