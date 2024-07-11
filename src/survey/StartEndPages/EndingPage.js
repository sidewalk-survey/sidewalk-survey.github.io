import React from 'react';
import { Button, Card, CardBody,  } from "@material-tailwind/react";

const EndingPage = ({ previousStep, onSubmit, continueUrl, onEmailLink }) => {
  return (
    
    <Card className=" mt-4 shadow-none">
    <CardBody className="flex flex-col items-center justify-center p-4 gap-2">
    {!continueUrl &&(
      <div className="max-w-md mb-8">
        <img src={`${process.env.PUBLIC_URL}/img/access-score.png`} alt="Welcome" className="w-full" />
      </div>
    )}
      <h2>Thank you so much for completing this survey!</h2>
      {!continueUrl &&(
        <p>Your contribution will be used to inform personalized routing algorithms and maps.</p>
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
        onClick={onSubmit}
      >Submit
        </Button>
      {/* <span className="text-w text-teal-700">press Enter ↵</span> */}
        </div>
      </div>
    </CardBody>
  </Card>

);
};

export default EndingPage;
