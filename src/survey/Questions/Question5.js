import React from 'react';
import TextQuestion from '../../components/TextQuestion'; 

const Question5 = ({ stepNumber, nextStep, previousStep, answers, handleChange }) => {
  const answeredMobilityAids = answers.answeredMobilityAids || [];
  const remainingOptions = answers.mobilityAidOptions.mobilityAidOptions.filter(option => !answeredMobilityAids.includes(option));
  let mobilityAid = '';

  if (answeredMobilityAids.length === 0) {
    mobilityAid = answers.mobilityAid.toLowerCase();
  } else {
    mobilityAid = remainingOptions[0].toLowerCase();
  }

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

