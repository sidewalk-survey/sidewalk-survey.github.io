import React, { useState, useEffect } from 'react';
import DraggableQuestion from '../../components/DraggableQuestion';

const rankOptions = [
    { id: '1', value: "Fire hydrant or utility pole on sidewalk" },
    { id: '2', value: "Tree or vegetation on sidewalk" },
    { id: '3', value: "Parked scooters, bikes, or cars on sidewalk" },
    { id: '4', value: "Uneven sidewalk panel" },
    { id: '5', value: "Broken surface or cracks on sidewalk" },
    { id: '6', value: "Utility panel on sidewalk" },
    { id: '7', value: "Brick or cobblestone surface" },
    { id: '8', value: "Grass surface" },
    { id: '9', value: "Sand or gravel surface" },
    { id: '10', value: "Narrow sidewalk (width less than 1.2m / 4 ft)" },
    { id: '11', value: "Missing curb ramp at intersections" },
    { id: '12', value: "Steep slope (sidewalk incline greater than 5%)" },
    { id: '13', value: "Steps or stairs" },
    { id: '14', value: "Trash or recycling bins on sidewalk" },
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
        questionText={<span>{stepNumber}. When using your <strong>{mobilityAid}</strong>,  please rank the following barriers based on your confidence in passing them, with 1 being the least confident and  {rankedOptions.length} being the most confident.</span>}
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
