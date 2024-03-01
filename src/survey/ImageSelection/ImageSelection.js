//ImageSelection.js
import React, { useState, useEffect } from 'react';
import PageNavigations from '../../components/PageNavigations';
import ResponseButtons from '../../components/ResponseButtons';
import './ImageSelection.css';
import LRButton from '../../components/LeftRightButtons';


const ImageSelection = ({ previousStep, nextStep, images, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [groupAImages, setGroupAImages] = useState([]);
    const [groupBImages, setGroupBImages] = useState([]);

    useEffect(() => {
        // Check if the user has responded to the last image
        if (currentIndex === images.length) {
            // Call onComplete with the latest state
            onComplete({ groupAImages, groupBImages });
        }
    }, [currentIndex, groupAImages, groupBImages, images.length, onComplete]);


    const handleResponse = (response) => {
        console.log(`Response for ${images[currentIndex]}: ${response}`);
        const updatedGroupA = [...groupAImages];
        const updatedGroupB = [...groupBImages];
        
        // Add image to Group A if response is Yes or Unsure
        if (response === 'yes' || response === 'unsure') {
            updatedGroupA.push(images[currentIndex]);
        }
        // Add image to Group B if response is No or Unsure
        if (response === 'no' || response === 'unsure') {
            updatedGroupB.push(images[currentIndex]);
        }

        // Update state with the new groups
        setGroupAImages(updatedGroupA);
        setGroupBImages(updatedGroupB);

        // Move to the next image or complete the selection
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
    };
    
    const progress = (currentIndex / images.length) * 100;

    const goToPreviousImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const goToNextImage = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const renderDotsAndNavigation = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', padding: '4px 0' }}>
                <LRButton 
                direction="left" 
                onClick={goToPreviousImage}  
                style={{ cursor: currentIndex > 0 ? 'pointer' : 'not-allowed', opacity: currentIndex > 0 ? 1 : 0.5 }}
                />
                {images.map((_, index) => (
                    <span
                        key={index}
                        style={{
                            height: '8px',
                            width: '8px',
                            borderRadius: '50%',
                            backgroundColor: currentIndex >= index ? '#14b8a6' : '#D8DEE9',
                        }}
                    ></span>
                ))}
                <LRButton 
                direction="right"
                onClick={goToNextImage} 
                style={{ cursor: currentIndex < images.length - 1 ? 'pointer' : 'not-allowed', opacity: currentIndex < images.length - 1 ? 1 : 0.5 }}
                />
            </div>
        );
    };


return (
    <div className="image-selection-container">
        <div className="question-container">
            <div className="image-content">
                <div className="text-center bg-gray-200 p-5 rounded mb-4">
                    <h2 className="question-header">5. When using your current mobility aid, do you feel comfortable passing this?</h2>
                </div>
                <div className="image-selection-options">
                    <div className="image-wrapper">
                        <div class="label-marker"></div>
                        <img
                            className="image rounded-xl"
                            src={images[currentIndex]}
                            alt={`Image ${currentIndex + 1}`}
                        />
                    </div>
                    {renderDotsAndNavigation()}
                    <ResponseButtons
  gap="12px" // Adjust the gap as needed
  buttons={[
    { text: 'No', onClick: () => handleResponse('no') },
    { text: 'Unsure', onClick: () => handleResponse('unsure'), variant: 'outlined' },
    { text: 'Yes', onClick: () => handleResponse('yes') }
  ]}
/>
                </div>
            </div>
            <PageNavigations onPrevious={previousStep} onNext={nextStep} />
        </div>
    </div>
  );
};

export default ImageSelection;