import React from 'react';
import { Button, Radio } from '@material-tailwind/react';
import { Warning } from 'phosphor-react';
import PageNavigations from './PageNavigations';
import withEnterKeyHandler from './withEnterKeyHandler';

const RadioQuestion = ({ questionText, inputId, instructionText, options, handleChange, previousStep, nextStep, error }) => {
  return (
    <div className="question-container">
      <div className="question-content">
        <h2>{questionText}</h2>
        <p style={{ fontSize: '0.8em', textAlign: 'left', marginBottom: '32px' }}>{instructionText}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8em', textAlign: 'left' }} className="text-base">
          {options.map((option, index) => (
            <Radio
              key={index}
              color='teal'
              name={inputId} 
              value={option.value}
              label={option.label}
              onChange={handleChange} 
            />
          ))}
        </div>
        {error && (
          <div className="flex items-center mt-2 text-red-700 bg-red-50 p-2 rounded max-w-max">
            <Warning size={24} weight="fill" className="mr-2" />
            <p className="text-w">{error}</p>
          </div>
        )}
        <div className="question-button-group">
            <Button size='lg' className="lg-font-size-button" color="teal" onClick={nextStep}>OK</Button>
        </div>
      </div>
      <PageNavigations onPrevious={previousStep} onNext={nextStep} />
    </div>
  );
};

export default withEnterKeyHandler(RadioQuestion);
