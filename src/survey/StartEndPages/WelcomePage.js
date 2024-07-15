import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

const WelcomePage = ({ onStart }) => {
  const [isWelcomeDialogOpen, setIsWelcomeDialogOpen] = useState(false);

  const handleStart = () => {
    setIsWelcomeDialogOpen(true);
  };

  const handleCloseWelcomeDialog = () => {
    setIsWelcomeDialogOpen(false);
    onStart();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (isWelcomeDialogOpen) {
        handleCloseWelcomeDialog();
      } else {
      handleStart();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isWelcomeDialogOpen]);

  return (
    <>
      <Card className="max-w-2xl mt-4 shadow-none">
        <CardBody className="flex flex-col items-center justify-center p-4 gap-2">
          <div className="max-w-md mb-8">
            <img src={`${process.env.PUBLIC_URL}/img/ps_logo.jpg`} alt="Welcome" className="w-full" />
          </div>
          <h2>Perceptions on Sidewalk Barriers Survey</h2>
          <div className="question-button-group flex flex-col">
            <Button
              className='lg-font-size-button'
              color="teal"
              size="lg"
              onClick={handleStart}
            >
              Start
            </Button>
            <span className="text-w text-teal-700">press Enter ↵</span>
          </div>
        </CardBody>
      </Card>
      <Dialog open={isWelcomeDialogOpen} handler={setIsWelcomeDialogOpen} size="lg">
        <DialogHeader>Welcome to our research study on mobility devices and  sidewalk accessibility.</DialogHeader>
        <DialogBody className="max-h-[calc(100vh-200px)] overflow-auto">
        <p>In this survey, you will be asked to evaluate sidewalk conditions using <a href="https://www.google.com/streetview/" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline">Google Street View</a> images and data collected from <a href="https://sidewalk-sea.cs.washington.edu/" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline">Project Sidewalk</a> (a crowdsourcing platform for sidewalk accessibility). These images showcase different sidewalk features, obstacles, and conditions.</p>
        {/* <p>In this survey, you will be asked to evaluate sidewalk conditions using Google Street View images and data collected from Project Sidewalk (a crowdsourcing platform for sidewalk accessibility). These images showcase different sidewalk features, obstacles, and conditions.</p> */}
          <br />
          <p><strong>Your task:</strong></p>
          <ul className="list-disc list-inside">
            <li>View 9 sets of images and immerse yourself in each scenario.</li>
            <li>Rate your confidence in navigating or passing through these situations.</li>
            <li>Compare two scenarios and select the one you are more confident in passing through.</li>
          </ul>
          <br />
          <p><strong>You may save your responses when prompted and come back at a later time.</strong></p>
          <br />
          <p>Please use your best judgment when evaluating each scenario. There are no right or wrong answers – we are interested in your personal perceptions and experiences. Your responses will be kept confidential and will be used for research purposes only.</p>
          <br />
          <p>We're interested in understanding how people using different mobility devices perceive barriers in urban environments. Your responses will help us gain valuable insights into sidewalk accessibility challenges.</p>
          <br />
          <p>This work is led by researchers from the University of Washington. If you have any questions, please contact: <a href="mailto:chuchuli@cs.washington.edu" className="text-teal-700 underline">chuchuli@cs.washington.edu</a>.</p>
       

        </DialogBody>
        <DialogFooter>
          <Button size= "lg" color="teal" onClick={handleCloseWelcomeDialog}>Begin Survey</Button>
          <span className="ml-4 text-w text-teal-700">press Enter ↵</span>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default WelcomePage;
