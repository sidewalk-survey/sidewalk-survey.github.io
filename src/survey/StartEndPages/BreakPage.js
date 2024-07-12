import React from 'react';
import { Button } from '@material-tailwind/react';

const BreakPage = ({ onContinue, completedGroups }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <h2>Time for a quick break!</h2>
        <p>You've completed {completedGroups} of 9 groups of images. </p>
        
        <Button size='lg' className="lg-font-size-button" color="teal" onClick={onContinue}>Next Group</Button>
      </div>
    </div>
  );
};

export default BreakPage;