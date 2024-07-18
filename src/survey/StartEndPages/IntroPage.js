import React, { useState } from 'react';
import { Button } from "@material-tailwind/react";

const IntroPage = ({ nextStep }) => {
  const [error, setError] = useState("");

  const handleNextStep = () => {
    // Validation logic
    if (!document.getElementById('confirmationCheckbox').checked) {
      setError("Please confirm you have read the instructions.");
    } else {
      setError(""); // Clear the error
      console.log("Proceeding to next step");
      nextStep(); // Proceed to the next step
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 text-left text-base">
      <h2 className="text-2xl font-semibold mb-4">Welcome to our study on mobility devices and sidewalk accessibility!</h2>
      <div className="mb-4">
        {/* Image */}
        <img src={`${process.env.PUBLIC_URL}/img/label-examples.png`} alt="Welcome" />
      </div>
      <p className="mb-4">
        In this survey, we will ask you about <b>your perceptions of various sidewalk barriers</b> such as obstacles and surface problems as shown in images similar to the above. Our goal is to understand how people using different mobility devices perceive barriers in urban environments.
      </p>
      <p className="mb-4">
        You may <b>save your responses</b> when prompted and come back at a later time. Your responses will be kept confidential and will be used for research purposes only.
      </p>
      <p className="mb-4">
        One out of every 30 respondents will earn a <b>$50 gift certificate to Amazon</b>.
      </p>
      <p className="mb-8">
        This work is led by researchers from the University of Washington. If you have any questions, please contact: <a href="mailto:chuchuli@cs.washington.edu" className="text-teal-700 underline">chuchuli@cs.washington.edu</a>.
      </p>
      <div className="mb-4">
        <input type="checkbox" id="confirmationCheckbox" />
        <label htmlFor="confirmationCheckbox" className="ml-2">I have read and understood the instructions.</label>
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex justify-end items-center">
        <Button size="lg" color="teal" onClick={handleNextStep}>Let’s get started</Button>
        <span className="ml-4 text-teal-700">press Enter ↵</span>
      </div>
    </div>
  );
};

export default IntroPage;
