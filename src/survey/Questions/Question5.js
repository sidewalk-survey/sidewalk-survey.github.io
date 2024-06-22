import React from 'react';
import TextQuestion from '../../components/TextQuestion'; 

const Question5 = ({ previousStep, nextStep, handleChange, stepNumber }) => {
  return (
    <TextQuestion
      questionText={`${stepNumber}. When using your current mobility aid, what are the most difficult sidewalk barriers that you encounter?`}
      inputId="sidewalkBarriers"
      placeholderText="e.g. missing curb ramps, poles..."
      handleChange={handleChange}
      previousStep={previousStep}
      nextStep={nextStep}
    />
  );
};

export default Question5;

