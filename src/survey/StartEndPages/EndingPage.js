import React from 'react';
import { Button } from "@material-tailwind/react";

const EndingPage = ({ previousStep, onSubmit, continueUrl }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: "24px", alignItems: 'center', position: 'relative', margin: 'auto', width: '90vw' }}>
      <h2 className="mb-4">Thank you so much for completing this survey!</h2>
      
      {continueUrl && (
        <div>
          <p>You can resume your survey later using the following link:</p>
          <a href={continueUrl}>{continueUrl}</a>
        </div>
      )}
      
      <div className="flex justify-center gap-4 mt-5">
        {/* <Button
          className='lg-font-size-button'
          color="teal"
          variant="outlined"
          size="lg"
          onClick={previousStep}
        >
          Go Back
        </Button> */}
        <Button
          className='lg-font-size-button'
          color="teal"
          size="lg"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default EndingPage;
