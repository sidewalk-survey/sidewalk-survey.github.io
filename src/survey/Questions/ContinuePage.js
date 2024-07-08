import React, { useState } from 'react';
import RadioQuestion from '../../components/RadioQuestion';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../config';

const ContinuePage = ({ answers, handleMobilityAidChange, previousStep, yesStep, nextStep, setContinueUrl, logData }) => {
  const [localContinueUrl, setLocalContinueUrl] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const answeredMobilityAids = answers.answeredMobilityAids || [];
  const remainingOptions = (answers.mobilityAidOptions?.mobilityAidOptions || []).filter(option =>
    option !== answers.mobilityAid && !answeredMobilityAids.includes(option)
  );

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

  const handleOptionChange = (event) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
  };

  const handleNextStep = async () => {
    if (selectedOption === "yes") {
      logData();
      yesStep();
      handleMobilityAidChange(remainingOptions[0]);
    } else if (selectedOption === "later") {
      answers.answeredMobilityAids.push(answers.mobilityAid);
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
      nextStep();
    } else {
      setLocalContinueUrl('');
      setContinueUrl('');
      nextStep();
    }
  };

  const remainingOptionsString = remainingOptions.join(', ').toLowerCase();

  return (
    <div>
      <RadioQuestion
        questionText={`Would you like to rate images when using ${remainingOptionsString}?`}
        inputId="continueOptions"
        instructionText="Select one option"
        options={continueOptions}
        handleChange={handleOptionChange}
        previousStep={previousStep}
        nextStep={handleNextStep}
        error=""
      />
    </div>
  );
};

export default ContinuePage;
