import React, { useState } from 'react';
import RadioQuestion from '../../components/RadioQuestion'; // Adjust the import path as necessary

const questionOptions = [
  { value: "Walking cane or stick", label: "Walking cane or stick" },
  { value: "Walker", label: "Walker" },
  { value: "Crutches", label: "Crutches" },
  { value: "Mobility scooter", label: "Mobility scooter" },
  { value: "Manual wheelchair", label: "Manual wheelchair" },
  { value: "Motorized wheelchair", label: "Motorized wheelchair" },
  { value: "Something else", label: "Something else" },
];

const Question3 = ({ previousStep, nextStep, updateAnswers}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    updateAnswers('mobilityAid', value); // Assuming updateAnswers takes the key and value to update
  };

  return (
    <RadioQuestion
      questionText="3. When going outside your home and into the community, do you use any of the following?"
      instructionText="If you use multiple, please select the one that you use most frequently."
      options={questionOptions}
      handleChange={handleChange} // Simplified the handleChange usage
      previousStep={previousStep}
      nextStep={() => {
        console.log(selectedOption); // For example, logging the selected option
        nextStep();
      }}
    />
  );
};

export default Question3;

