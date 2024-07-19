import React, { useState, useEffect } from 'react';
import DraggableQuestion from '../../components/DraggableQuestion';

const rankOptions = [
    { id: '1', value: "Uneven sidewalk panels" },
    { id: '2', value: "Broken surface or cracks on sidewalk" },
    { id: '3', value: "Manholes on sidewalk" },
    { id: '4', value: "Brick or cobblestone surface" },
    { id: '5', value: "Grass surface" },
    { id: '6', value: "Sand or gravel surface" },
    { id: '7', value: "Narrow sidewalk (width less than 1.2m / 4 ft)" },
    { id: '8', value: "Missing curb ramp at intersections" },
    { id: '9', value: "Steep slope (sidewalk incline greater than 5%)" },
  ];

const RankQuestion = ({ stepNumber, nextStep, previousStep, answers, updateAnswers }) => {
    const mobilityAid = answers.mobilityAid.toLowerCase();
    const [rankedOptions, setRankedOptions] = useState(rankOptions);
  
    useEffect(() => {
      const initialOptions = rankOptions.map(option => ({
        ...option,
        isSelected: option.value.toLowerCase() === mobilityAid
      }));
      setRankedOptions(initialOptions);
    }, [mobilityAid]);
  
    const handleRankingChange = (newItems) => {
      setRankedOptions(newItems);
    };
  
    const handleNextStep = () => {
      const orderedOptions = rankedOptions.map(option => option.value);
      updateAnswers('rankedOptions', { rankedOptions: orderedOptions });
      nextStep();
    };
  
    return (
      <DraggableQuestion
        questionText={<span>{stepNumber}. When using your <strong>{mobilityAid}</strong>,  please rank the following barriers based on passibility, with 1 being the most difficult and  {rankedOptions.length} being the easiest.</span>}
        inputId="rankedOptions" 
        instructionText="Drag and drop the options to rank them."
        options={rankedOptions}
        handleChange={handleRankingChange}
        previousStep={previousStep}
        nextStep={handleNextStep}
      />
    );
  };
  
  export default RankQuestion;
