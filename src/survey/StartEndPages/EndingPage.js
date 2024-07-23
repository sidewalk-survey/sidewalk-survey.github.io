import React, {useState} from 'react';
import { Button, Card, CardBody,  } from "@material-tailwind/react";

const EndingPage = ({ previousStep, onSubmit, continueUrl, onEmailLink }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit();
  }

  return (
    
    <div className="max-w-6xl flex flex-col items-center justify-center p-4 gap-2">
      <h2>Thank you so much for completing this survey!</h2>
      {!continueUrl &&(
      <div className="max-w-md mb-8">
        <img src={`${process.env.PUBLIC_URL}/img/access-score.png`} alt="Welcome" className="w-full" />
      </div>
    )}
      {!continueUrl &&(
        <p style={{fontSize: '1em', lineHeight: '1.3'}}>Your responses will be used to inform <b>personalized routing</b> algorithms and maps for <b>people who use mobility devices.</b></p>
      )}
      {continueUrl && (
        <div>
          <p>You can resume your survey later using the following link:</p>
          <a href={continueUrl} className="text-cyan-800 underline">{continueUrl}</a>
        </div>
      )}
      <div className="question-button-group flex flex-col">
      <div className="flex justify-center gap-4 mt-5">
      {continueUrl && (
          <Button
            className='lg-font-size-button'
            color="teal"
            variant= "outlined"
            size="lg"
            onClick={onEmailLink}
          >
            Email Me the Link
          </Button>
        )}
      <Button
        className='lg-font-size-button'
        color="teal"
        size="lg"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >Submit
        </Button>
      {/* <span className="text-w text-teal-700">press Enter ↵</span> */}
        </div>
      </div>
    </div>

);
};

export default EndingPage;
