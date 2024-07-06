import React, { useEffect } from 'react';
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

const WelcomePage = ({ onStart }) => {
  // Function to handle the "Enter" key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onStart();
    }
  };

  // Add and remove the event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <Card className="max-w-lg mt-4 shadow-none">
      <CardBody className="flex flex-col items-center justify-center p-4 gap-4">
        <div className="w-full">
          <img src={`${process.env.PUBLIC_URL}/img/ps_logo.jpg`} alt="Welcome" className="w-full" />
        </div>
        <h2 className="mb-4">Perceptions on Sidewalk Barriers Survey</h2>
        <Button
          className='lg-font-size-button'
          color="teal"
          size="lg"
          onClick={onStart}
        >
          Start
        </Button>
      </CardBody>
    </Card>
  );
};

export default WelcomePage;
