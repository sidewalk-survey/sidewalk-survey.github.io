import React from 'react';
import TextQuestion from '../../components/TextQuestion'; 

const Question5 = ({ stepNumber, nextStep, previousStep, answers, handleChange }) => {
  const mobilityAid = answers.mobilityAid;

  return (
    <TextQuestion
      questionText={<span>{stepNumber}. When using your <strong>{mobilityAid}</strong>, what are the most difficult sidewalk barriers that you encounter?</span>}
      inputId="sidewalkBarriers"
      placeholderText="e.g. missing curb ramps, poles..."
      handleChange={handleChange}
      previousStep={previousStep}
      nextStep={nextStep}
    />

  );


};

export default Question5;

