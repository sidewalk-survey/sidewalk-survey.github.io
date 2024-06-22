import React, { useState } from 'react';
import CheckboxQuestion from '../../components/CheckboxQuestion'; 

const questionOptions = [
  { value: "Walking cane or stick", label: "Walking cane or stick" },
  { value: "Walker", label: "Walker" },
  { value: "Crutches", label: "Crutches" },
  { value: "Mobility scooter", label: "Mobility scooter" },
  { value: "Manual wheelchair", label: "Manual wheelchair" },
  { value: "Motorized wheelchair", label: "Motorized wheelchair" },
  { value: "Something else", label: "Something else" },
];

const Question3 = ({ previousStep, nextStep, updateAnswers, stepNumber}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    updateAnswers('mobilityAid', value); 
  };

  return (
    <CheckboxQuestion
      questionText={`${stepNumber}. When going outside your home and into the community, do you use any of the following?`}
      instructionText="If you use multiple, please select the one that you use most frequently."
      options={questionOptions}
      handleChange={handleChange}
      previousStep={previousStep}
      nextStep={() => {
        console.log(selectedOption);
        nextStep();
      }}
    />
  );
};

export default Question3;

