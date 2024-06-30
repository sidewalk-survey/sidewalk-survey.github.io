import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DraggableQuestion from '../../components/DraggableQuestion';

const rankOptions = [
    { id: '1', value: "Fire hydrants or utility poles in the middle of the sidewalk" },
    { id: '2', value: "Trees or vegetation in the middle of the sidewalk" },
    { id: '3', value: "Parked scooter, bike or car in the middle of the sidewalk" },
    { id: '4', value: "Height difference between sidewalk panels" },
    { id: '5', value: "Broken Surface / Cracks on sidewalk surface" },
    { id: '6', value: "Utility panel in the middle of the sidewalk" },
    { id: '7', value: "Brick / Cobble stone surface" },
    { id: '8', value: "Grass surface" },
    { id: '9', value: "Sand / Gravel surface" },
    { id: '10', value: "Narrow sidewalk (width of sidewalk < 1.2m / 4ft)" },
    { id: '11', value: "Missing curb ramp at intersections" },
    { id: '12', value: "Slope (slope of sidewalk > 5%)" },
    { id: '13', value: "Steps" }
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

    //   TODO: maybe change the questionText to be "top" being the most difficult and "bottom" being the easiest
      <DraggableQuestion
        questionText={<span>{stepNumber}. When using your <strong>{mobilityAid}</strong>, how would you rank the following, with 1 being the most difficult and {rankedOptions.length} being the easiest?</span>}
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
