import React from 'react';
import TextQuestion from '../../components/TextQuestion'; // Assuming Question.js is the file name

const Question4 = ({ previousStep, nextStep, handleChange }) => {
  return (
    <TextQuestion
      questionText="4. When using your current mobility aid, what are the most difficult sidewalk barriers that you encounter?"
      inputId="sidewalkBarriers"
      placeholderText="e.g. missing curb ramps, poles..."
      handleChange={handleChange}
      previousStep={previousStep}
      nextStep={nextStep}
    />
  );
};

export default Question4;

