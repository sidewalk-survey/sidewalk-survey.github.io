
import React from 'react';
import TextQuestion from '../../components/TextQuestion'; 

const Question2 = ({ previousStep, nextStep, handleChange, stepNumber, errors }) => {
  return (
    <TextQuestion
      questionText={`${stepNumber-1}. What is your email address?*`}
      inputId="email"
      placeholderText="example@gmail.com"
      handleChange={handleChange}
      previousStep={previousStep}
      nextStep={nextStep}
      error={errors.email}
    />
  );
};

export default Question2;



