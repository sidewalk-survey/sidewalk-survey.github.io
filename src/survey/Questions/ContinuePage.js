import React, { useState } from 'react';
import RadioQuestion from '../../components/RadioQuestion';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'; 
import { firestore } from '../../config';

const ContinuePage = ({ answers, handleMobilityAidChange, previousStep, yesStep, nextStep, setContinueUrl }) => {
  const [localContinueUrl, setLocalContinueUrl] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const answeredMobilityAids = answers.answeredMobilityAids || [];
  const remainingOptions = answers.mobilityAidOptions.mobilityAidOptions.filter(option => !answeredMobilityAids.includes(option));

  const continueOptions = [
    {
      value: "yes",
      label: "Yes, I would like to rate them now"
    },
    {
      value: "later",
      label: "Yes, but I would like to rate them later"
    },
    {
      value: "no",
      label: "No"
    }
  ];

  const handleOptionChange = async (event) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
  
    if (newValue === "later") {
      try {
        const docRef = await addDoc(collection(firestore, "surveyAnswers"), {
          ...answers,
          timestamp: serverTimestamp()
        });
  
        const resumeUrl = `${window.location.origin}/resume-survey/${docRef.id}`;
        setLocalContinueUrl(resumeUrl);
        setContinueUrl(resumeUrl);
      } catch (error) {
        console.error("Error saving document: ", error);
      }
    } else if (newValue === "yes") {
      handleMobilityAidChange(remainingOptions[0]);
    } else {
      setLocalContinueUrl('');
      setContinueUrl('');
    }
  };

  const remainingOptionsString = remainingOptions.join(', ');

  return (
    <div>
      <RadioQuestion
        questionText={`Would you like to rate images when using ${remainingOptionsString}?`}
        inputId="continueOptions"
        instructionText="Select one option"
        options={continueOptions}
        handleChange={handleOptionChange}
        previousStep={previousStep}
        nextStep={() => {
          if (selectedOption === "yes") {
            yesStep();
          } else {
            nextStep();
          }
        }}
      />
    </div>
  );
};

export default ContinuePage;
