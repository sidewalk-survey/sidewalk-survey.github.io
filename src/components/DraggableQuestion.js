import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { DotsSixVertical } from '@phosphor-icons/react';
import './DraggableQuestion.css';

const DraggableQuestion = ({ questionText, inputId, instructionText, options, handleChange, previousStep, nextStep }) => {
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    // Function to shuffle the options array
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    // Shuffle the options and update state
    setShuffledOptions(shuffleArray([...options]));
  }, []); // Empty dependency array ensures this runs only once

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(shuffledOptions);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setShuffledOptions(newItems);
    handleChange(newItems);
  };

  const handleDropdownChange = (e, currentIndex) => {
    const newOrder = parseInt(e.target.value, 10) - 1;
    const newItems = Array.from(shuffledOptions);
    const [movedItem] = newItems.splice(currentIndex, 1);
    newItems.splice(newOrder, 0, movedItem);
    setShuffledOptions(newItems);
    handleChange(newItems);
  };

  return (
    <div className="question-container">
      <div className="draggable-question-content">
        <h2>{questionText}</h2>
        <p style={{ fontSize: '0.8em', textAlign: 'left', marginTop: '24px', marginBottom: '24px' }}>{instructionText}</p>
        <div className="draggable-options-and-legend">
          <div className="draggable-legend">
            <div className="legend-labels">
              <span id="difficult">difficult</span>
              <span id="easy">easy</span>
            </div>
            <div className='gradient-line'></div>
          </div> 

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={inputId}>
            {(provided) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '12px', 
                }}
              >
                {shuffledOptions.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          fontSize: '0.8em',
                          padding: '6px 12px 6px 0px',
                          margin: '0 0 4px 0',
                          backgroundColor: '#E0F2F1',
                          borderRadius: '8px',
                          textAlign: 'left',
                          maxWidth: '80vw', 
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          ...provided.draggableProps.style,
                        }}
                      >
                        <DotsSixVertical weight='bold' style={{ marginRight: '2px', color:"#0d9488"}} />
                        <select 
                          value={index + 1} 
                          onChange={(e) => handleDropdownChange(e, index)}
                          style={{ fontSize: '0.8em', marginRight: '8px' }}
                        >
                          {shuffledOptions.map((_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                        {item.value}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        </div>
        <div className="question-button-group items-center">
          <Button size='lg' className="lg-font-size-button" color="teal" onClick={nextStep}>OK</Button>
          <span className="text-w text-teal-700" >press Enter ↵</span>
        </div>
      </div>
    </div>
  );
};

export default DraggableQuestion;
