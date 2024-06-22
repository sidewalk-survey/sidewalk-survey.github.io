import React from 'react';
import { Button, Checkbox } from '@material-tailwind/react';

const CheckboxQuestion = ({ questionText, instructionText, options, handleChange, previousStep, nextStep }) => {
    return (
        <div className="question-container">
        <div className="question-content">
            <h2>{questionText}</h2>
            <p style={{ fontSize: '0.8em', textAlign: 'left', marginBottom: '32px' }}>{instructionText}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8em', textAlign: 'left' }} className="text-base">
            {options.map((option, index) => (
                <Checkbox
                key={index}
                color='teal'
                name={option.value} 
                value={option.value}
                label={option.label}
                onChange={handleChange} 
                />
            ))}
            </div>
            <div className="question-button-group">
                <Button size='lg' className="lg-font-size-button" color="teal" onClick={nextStep}>OK</Button>
            </div>
        </div>
        </div>
    );
};

export default CheckboxQuestion;