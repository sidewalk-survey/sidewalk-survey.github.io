import React from 'react';
import { Button } from '@material-tailwind/react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import PageNavigations from './PageNavigations';

const DraggableQuestion = ({ questionText, inputId, instructionText, options, handleChange, previousStep, nextStep }) => {
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(options);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    handleChange(newItems);
  };

  return (
    <div className="question-container">
      <div className="question-content">
        <h2>{questionText}</h2>
        <p style={{ fontSize: '0.6em', textAlign: 'left', marginTop: '10px', marginBottom: '10px' }}>{instructionText}</p>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={inputId}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {options.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          padding: '6px',
                          margin: '0 0 8px 0',
                          backgroundColor: '#E0F2F1',
                          borderRadius: '4px',
                          fontSize: '0.6em',
                          textAlign: 'left',
                          width: 'fit-content',
                          ...provided.draggableProps.style,
                        }}
                      >
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
        <div className="question-button-group">
          <Button size='lg' className="lg-font-size-button" color="teal" onClick={nextStep}>OK</Button>
        </div>
      </div>
      <PageNavigations onPrevious={previousStep} onNext={nextStep} />
    </div>
  );
};

export default DraggableQuestion;
