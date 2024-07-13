import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../config';

const BreakPage = ({ onContinue, answers, completedGroups }) => {
  const [continueUrl, setContinueUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const onSave = async () => {
    setIsSaving(true);
    try {
      const docRef = await addDoc(collection(firestore, "surveyAnswers"), {
        ...answers,
        isGroupContinue: true,
        timestamp: serverTimestamp()
      });

      const resumeUrl = `${window.location.origin}/access-survey/#/resume-survey/${docRef.id}`;
      setContinueUrl(resumeUrl);
    } catch (error) {
      console.error("Error saving document: ", error);
    }
    setIsSaving(false);
  }

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
        <p>You've completed {completedGroups} of 9 groups of images.</p>
        
        {continueUrl ? (
          <div>
            <p>You can resume later using this link:</p>
            <a href={continueUrl} target="_blank" rel="noopener noreferrer">{continueUrl}</a>
          </div>
        ) : (
          <div>
            <Button size='lg' className="lg-font-size-button" color="white" onClick={onSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save & Continue Later'}
            </Button>
            <Button size='lg' className="lg-font-size-button" color="teal" onClick={onContinue}>Next Group</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreakPage;
