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

const Question3 = ({ previousStep, nextStep, updateAnswers, stepNumber }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [customValue, setCustomValue] = useState(''); // this is for something else option

  const handleChange = (event) => {
    const { value, checked } = event.target;
    setSelectedOptions((prevSelectedOptions) => {
      if (checked) {
        return [...prevSelectedOptions, value];
      } else {
        return prevSelectedOptions.filter((option) => option !== value);
      }
    });
  };

  const handleCustomChange = (event) => {
    setCustomValue(event.target.value);
  };

  const handleNextStep = () => {
    // Maintain the order of options as per the screen order
    const orderedSelectedOptions = questionOptions
      .map((option) => option.value)
      .filter((option) => selectedOptions.includes(option));

    updateAnswers('mobilityAidOptions', { mobilityAidOptions: orderedSelectedOptions, customMobilityAid: customValue });
    nextStep();
  };

  return (
    <CheckboxQuestion
      questionText={`${stepNumber}. When going outside your home and into the community, do you use any of the following?`}
      instructionText="If you use multiple, please select the one that you use most frequently."
      options={questionOptions}
      selectedOptions={selectedOptions}
      handleChange={handleChange}
      customValue={customValue}
      handleCustomChange={handleCustomChange}
      previousStep={previousStep}
      nextStep={handleNextStep}
    />
  );
};

export default Question3;
