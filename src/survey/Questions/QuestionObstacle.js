import React, { useState } from 'react';
import RadioQuestion from '../../components/RadioQuestion'; 

const questionOptions = [
  { value: "Everyday or more often", label: "Everyday or more often" },
  { value: "A few times a week", label: "A few times a week" },
  { value: "A few times a month", label: "A few times a month" },
  { value: "Rarely or never", label: "Rarely or never" },
];

const QuestionObstacle = ({ previousStep, nextStep, updateAnswers, stepNumber}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    updateAnswers('obstacleOccur', value); 
  };

  return (
    <RadioQuestion
      questionText={`${stepNumber}. When going outside your home and into the community, how often do you experience obstacles?`}
      instructionText="e.g. poles, trash cans, etc."
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

export default QuestionObstacle;

