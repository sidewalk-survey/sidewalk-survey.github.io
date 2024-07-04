//ImageComparison.js
import React, { useState, useEffect } from 'react';
import PageNavigations from '../../components/PageNavigations';
import ResponseButtons from '../../components/ResponseButtons';
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
        if (!images || images.length < 2) {
            console.error("Images array is empty or not enough images for comparison.");
            return [];
        }
        let pair;
        do {
            pair = [images[Math.floor(Math.random() * images.length)], images[Math.floor(Math.random() * images.length)]];
        } while (pair[0] === pair[1] || history.some(h => h.toString() === pair.toString()));

        setCurrentPair(pair);
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
                        backgroundColor: i < historyIndex ? '#0d9488' : '#D8DEE9',
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
        setLoading(true);
        let nextPair;
        if (historyIndex + 1 < history.length) {
                // If there's a next pair in history, use it
                nextPair = history[historyIndex + 1];
                setHistoryIndex(historyIndex + 1);
        } else {
                // Otherwise, get a new random pair and update history
                nextPair = getRandomImagePair();
                const newHistory = [...history, nextPair];
                setHistory(newHistory);
                setHistoryIndex(newHistory.length - 1);
            }
        setCurrentPair(nextPair);
        setLoading(false);
    };

    const updateSelectionAndDisplayNext = (selectedImage, comparisonResult = {}) => {
        setSelectedImage(selectedImage);
        console.log("Image selected: ", selectedImage);
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
            image1: currentPair[0],
            image2: currentPair[1],
            selectedImage: selected,
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
            console.log("Equal selected for: ", currentPair);
            updateSelectionAndDisplayNext(null, {
                image1: currentPair[0],
                image2: currentPair[1],
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
                <h2>{`${stepNumber} When using your current mobility aid, which one is easier to pass?`}</h2>
                <div className="flex-row-justify-center">
                    {currentPair.map((src, index) => (
                        <div 
                            className={`comparison-image-wrapper rounded-xl ${hoverButton === (index === 0 ? 'left' : 'right') ? 'border-teal-500 glow-shadow' : ''}`}
                            key={index}
                            style={{ borderWidth: hoverButton === (index === 0 ? 'left' : 'right') ? '4px' : '2px' }} // Keep dynamic styles inline
                        >
                            <div className="card-style" onClick={() => selectImage(index + 1)}>
                                <img src={src} alt={`Image ${index + 1}`} className="card-media-style" />
                                {selectedImage === src && (
                                    <div className="overlay-style">
                                    </div>
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