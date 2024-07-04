import React from 'react';
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

const WelcomePage = ({ onStart }) => {
  return (
    <Card className="max-w-lg mt-4 shadow-none">
      <CardBody className="flex flex-col items-center justify-center p-4 gap-4">
      <div className="w-full">
      <img src="/img/ps_logo.jpg" alt="Welcome" className="w-full"/>
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
