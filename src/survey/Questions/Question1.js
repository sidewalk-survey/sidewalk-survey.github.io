import React from 'react';
import TextQuestion from '../../components/TextQuestion'; // Assuming Question.js is the file name

const Question1 = ({ previousStep, nextStep, handleChange, stepNumber }) => {
  return (
    <TextQuestion
      questionText={`${stepNumber}. What is your name?`}
      inputId="name"
      placeholderText="Type your full name..."
      handleChange={handleChange}
      previousStep={previousStep}
      nextStep={nextStep}
    />
  );
};

export default Question1;
