//ImageComparison.js
import React, { useState, useEffect } from 'react';
import PageNavigations from '../../components/PageNavigations';
import ResponseButtons from '../../components/ResponseButtons';
import ImageComponent from '../../components/ImageComponent';
import './ImageComparison.css';

const ImageComparison = ({nextStep, previousStep, images, onSelectionComplete, onComplete, comparisonContext, stepNumber}) => {
    const [currentPair, setCurrentPair] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [history, setHistory] = useState([]); 
    const [historyIndex, setHistoryIndex] = useState(-1); 
    const [maxComparisons, setMaxComparisons] = useState(0);
    const [hoverButton, setHoverButton] = useState(null);

    useEffect(() => {
        // set the maximum number of comparisons dynamically
        const n = images.length;
        const calculatedComparisons = (n * (n - 1)) / 2;
        setMaxComparisons(calculatedComparisons);
        // display the first pair of images
        displayImages();
    }, [images]);

    const handleMouseEnter = (button) => {
        setHoverButton(button);
    };

    const handleMouseLeave = () => {
        setHoverButton(null);
    };

    const getRandomImagePair = () => {
        console.log("getRandomImagePair called");
        if (!images || images.length < 2) {
            console.error("Images array is empty or not enough images for comparison.");
            return [];
        }
        let attempts = 0;
        let pair;
        do {
            pair = [images[Math.floor(Math.random() * images.length)], images[Math.floor(Math.random() * images.length)]];
            attempts++;
            if (attempts > 100) { // Prevent infinite loops by setting a max attempt count
                console.log("Max attempts reached, breaking out of loop");
                break;
            }
        } while (
            pair[0].LabelID === pair[1].LabelID || // Prevent same image comparison
            history.some(h => 
                (h[0].LabelID === pair[0].LabelID && h[1].LabelID === pair[1].LabelID) || 
                (h[0].LabelID === pair[1].LabelID && h[1].LabelID === pair[0].LabelID)) // Check if this pair has already been compared
        );
    
        console.log("Pair generated:", pair.map(item => item.LabelID));
        return pair;
    };
    

    const renderComparisonDots = () => {
        let dots = [];
        for (let i = 0; i < maxComparisons; i++) {
            dots.push(
                <span
                    key={i}
                    style={{
                        height: '8px',
                        width: '8px',
                        borderRadius: '50%',
                        margin: '4px',
                        backgroundColor: i < historyIndex ? '#14b8a6' : '#D8DEE9',
                    }}
                ></span>
            );
        }
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
                {dots}
            </div>
        );
    };
    
    const displayImages = () => {
        console.log("displayImages called");
        setLoading(true);
        let nextPair;
        if (historyIndex + 1 < history.length) {
            console.log("Using next pair from history");
            nextPair = history[historyIndex + 1];
            setHistoryIndex(historyIndex + 1);
        } else {
            console.log("Generating new random pair");
            nextPair = getRandomImagePair();
            if (nextPair.length > 0) {
                console.log("New pair generated:", nextPair.map(item => item.LabelID));
                const newHistory = [...history, nextPair];
                setHistory(newHistory);
                setHistoryIndex(newHistory.length - 1);
            } else {
                console.log("Failed to generate a new valid pair");
            }
        }
        setCurrentPair(nextPair);
        setLoading(false);
    };
    

    const updateSelectionAndDisplayNext = (selectedImage, comparisonResult = {}) => {
        setSelectedImage(selectedImage);
        onSelectionComplete({ ...comparisonResult, comparisonContext });
        if (historyIndex + 1 >= maxComparisons) {
            onComplete();
        } else {
            displayImages();
        }
    };
    

    const selectImage = (index) => {
        const selected = currentPair[index - 1];
        updateSelectionAndDisplayNext(selected, {
            image1LabelID: currentPair[0].LabelID,
            image1City: currentPair[0].City, 
            image2LabelID: currentPair[1].LabelID,
            image2City: currentPair[1].City,
            selectedImageLabelID: selected.LabelID, 
            selectedImageCity: selected.City,
        });
    };

    const selectLeftImage = () => {
        if(currentPair.length === 2) {
            selectImage(1);
        }
    };

    const selectRightImage = () => {
        if(currentPair.length === 2) {
            selectImage(2);
        }
    };

    const recordEqualSelection = () => {
        if (currentPair.length === 2) {
            updateSelectionAndDisplayNext(null, {
                image1LabelID: currentPair[0].LabelID,
                image1City: currentPair[0].City, 
                image2LabelID: currentPair[1].LabelID,
                image2City: currentPair[1].City,
                selection: 'equal',
            });
        } else {
            console.log("No image pair is currently displayed.");
        }
    };

    console.log("currentComparison: ", comparisonContext);

    return (
        <div className="image-comparison-container">
            <div className="image-comparison-content"> 
                <h2>{`${stepNumber}. When using your current mobility aid, which one is easier to pass?`}</h2>
                <div className="comparison-twin">
                {/* <div className="flex-row-justify-center"> */}
                {currentPair.map((imageData, index) => (
                        <div 
                            className={`comparison-image-wrapper ${hoverButton === (index === 0 ? 'left' : 'right') ? 'border-teal-500 glow-shadow' : ''}`} // Additional classes and conditions
                            key={imageData.LabelID} // Use unique identifier from the metadata
                            style={{ borderWidth: hoverButton === (index === 0 ? 'left' : 'right') ? '4px' : '4px' }}
                        >
                            <div className="card-style" onClick={() => selectImage(index + 1)}>
                                {/* Using ImageComponent with cropMetadata */}
                                <ImageComponent cropMetadata={imageData} />
                                {selectedImage && selectedImage.LabelID === imageData.LabelID && (
                                    <div className="overlay-style"></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {renderComparisonDots()}
                <ResponseButtons
                gap="24px"
                disabled={loading} 
                buttons={[
                    {
                    text: 'Left Image',
                    onClick: () => selectLeftImage(),
                    onMouseEnter: () => handleMouseEnter('left'),
                    onMouseLeave: handleMouseLeave,
                    },
                    {
                    text: 'The Same',
                    onClick: () => recordEqualSelection(),
                    onMouseEnter: () => handleMouseEnter('equal'),
                    onMouseLeave: handleMouseLeave,
                    variant: 'outlined',
                    },
                    {
                    text: 'Right Image',
                    onClick: () => selectRightImage(),
                    onMouseEnter: () => handleMouseEnter('right'),
                    onMouseLeave: handleMouseLeave,
                    },
                ]}
                />

            </div>
            <PageNavigations onPrevious={previousStep} onNext={nextStep} />
            </div>
    );
};

export default ImageComparison;