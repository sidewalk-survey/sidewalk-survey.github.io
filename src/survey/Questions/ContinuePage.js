import React from 'react';
import RadioQuestion from '../../components/RadioQuestion';

const ContinuePage = ({ answers, handleMobilityAidChange, previousStep, nextStep }) => {
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

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === "yes" || selectedOption === "later") {
      handleMobilityAidChange(remainingOptions[0]); // Pass the current remaining option
    } else {
      nextStep(); 
    }
  };
  // function to create a string of all the remaining options
  const remainingOptionsString = remainingOptions.join(', ');

  return (
    <RadioQuestion
      questionText={`Would you like to rate images when using ${remainingOptionsString}?`}
      inputId="continueOptions"
      instructionText="Select one option"
      options={continueOptions}
      handleChange={handleOptionChange}
      previousStep={previousStep}
      nextStep={nextStep}
    />
  );
};

export default ContinuePage;
