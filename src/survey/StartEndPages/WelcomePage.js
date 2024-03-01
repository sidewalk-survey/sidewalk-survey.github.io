import React from 'react';
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

const WelcomePage = ({ onStart }) => {
  return (
    <Card className="max-w-md mx-auto mt-10 shadow-none">
      <CardBody className="flex flex-col items-center justify-center p-4 gap-4">
      <div className="w-1/3 mx-auto">
      <img src="/img/ps_logo.jpg" alt="Welcome" className="w-full mb-4"/>
      </div>
        {/* <Typography variant="h5" className="mb-2" color="teal">Perceptions on Sidewalk Barriers Survey</Typography> */}
        <h2 className="mb-4">Perceptions on Sidewalk Barriers Survey</h2>
        <Button
        className='lg-font-size-button'
          color="teal"
          buttonType="filled"
          size="lg"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
          onClick={onStart}
        >
          Start
        </Button>
      </CardBody>
    </Card>
  );
};

export default WelcomePage;
