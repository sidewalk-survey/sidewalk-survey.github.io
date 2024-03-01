
import React from 'react';
import TextQuestion from '../../components/TextQuestion'; // Assuming Question.js is the file name

const Question2 = ({ previousStep, nextStep, handleChange, stepNumber }) => {
  return (
    <TextQuestion
      questionText={`${stepNumber}. What is your email address?"`}
      inputId="email"
      placeholderText="example@gmail.com"
      handleChange={handleChange}
      previousStep={previousStep}
      nextStep={nextStep}
    />
  );
};

export default Question2;



