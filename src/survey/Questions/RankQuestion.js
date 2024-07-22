import React, { useState, useEffect } from 'react';
import DraggableQuestion from '../../components/DraggableQuestion';

const rankOptions = [
    { id: '1', value: "Uneven sidewalk panels", image: `${process.env.PUBLIC_URL}/crops/gsv-st_louis-2697-4-5.png` },
    { id: '2', value: "Broken surface or cracks on sidewalk", image: `${process.env.PUBLIC_URL}//crops/gsv-seattle-209069-4-2.png`  },
    { id: '3', value: "Manholes on sidewalk", image: `${process.env.PUBLIC_URL}/crops/gsv-chicago-39245-4-0.png`  },
    { id: '4', value: "Brick or cobblestone surface", image: `${process.env.PUBLIC_URL}/crops/gsv-columbus-39006-4-1.png`  },
    { id: '5', value: "Grass surface", image: `${process.env.PUBLIC_URL}/crops/gsv-chicago-631-4-3.png` },
    { id: '6', value: "Sand or gravel surface", image: `${process.env.PUBLIC_URL}/crops/gsv-seattle-273517-4-1.png`  },
    { id: '7', value: "Narrow sidewalk (width less than 1.2m / 4 ft)", image: `${process.env.PUBLIC_URL}/crops/gsv-oradell-5518-4-3.png`  },
    { id: '8', value: "Missing curb ramp at intersections" , image: `${process.env.PUBLIC_URL}/crops/gsv-seattle-175408-2-4.png` },
    { id: '9', value: "Steep slope (sidewalk incline greater than 5%) " , image: `${process.env.PUBLIC_URL}/crops/gsv-lapiedad-997-3-0.png` },
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
