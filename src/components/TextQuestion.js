import React from 'react';
import { Input, Button } from '@material-tailwind/react';
import './TextQuestion.css';
import PageNavigations from './PageNavigations';
import withEnterKeyHandler from './withEnterKeyHandler';

const TextQuestion = ({ questionText, inputId, placeholderText, handleChange, previousStep, nextStep }) => {
  return (
    <div className="question-container">
      <div className="question-content">
        <h2>{questionText}</h2>
        <div className="question-input-group">
          <Input
            className="question-input"
            id={inputId}
            color="teal"
            variant="static"
            type="text"
            placeholder={placeholderText}
            onChange={handleChange(inputId)}
            // fullWidth
          />
          <div className="question-button-group">
            <Button size='lg' className="lg-font-size-button" color="teal" onClick={nextStep}>OK</Button>
          </div>
        </div>
        <PageNavigations onPrevious={previousStep} onNext={nextStep} />
      </div>
    </div>
  );
};
export default withEnterKeyHandler(TextQuestion);
