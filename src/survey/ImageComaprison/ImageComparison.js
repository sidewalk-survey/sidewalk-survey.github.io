//ImageComparison.js
import React, { useState, useEffect } from 'react';
import PageNavigations from '../../components/PageNavigations';
import './ImageComparison.css';
import ResponseButtons from '../../components/ResponseButtons';
import LRButton from '../../components/LeftRightButtons';


const ImageComparison = ({nextStep, previousStep, images, onSelectionComplete, onComplete,comparisonContext}) => {
    const [displayedPairs, setDisplayedPairs] = useState(new Set());
    const [currentPair, setCurrentPair] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [history, setHistory] = useState([]); 
    const [historyIndex, setHistoryIndex] = useState(-1); 
    const [comparisonCount, setComparisonCount] = useState(0);
    const [maxComparisons, setMaxComparisons] = useState(0);
    const [hoverButton, setHoverButton] = useState(null);

    const handleMouseEnter = (button) => {
        setHoverButton(button);
    };

    const handleMouseLeave = () => {
        setHoverButton(null);
    };

    useEffect(() => {
        // set the maximum number of comparisons dynamically
        const n = images.length;
        const calculatedComparisons = (n * (n - 1)) / 2;
        setMaxComparisons(calculatedComparisons);
        // display the first pair of images
        displayImages();
    }, [images]);

    const getRandomImagePair = () => {
        if (!images || images.length < 2) {
            console.error("Images array is empty or not enough images for comparison.");
            return [];
          }
        let pair;
        do {
            pair = [images[Math.floor(Math.random() * images.length)], images[Math.floor(Math.random() * images.length)]];
        } while (displayedPairs.has(pair.toString()) || pair[0] === pair[1]);

        displayedPairs.add(pair.toString());
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
                        backgroundColor: i < historyIndex ? '#14b8a6' : '#D8DEE9',
                    }}
                ></span>
            );
        }
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
                {/* <LRButton
                    direction="left"
                    onClick={goToPreviousPair}
                    disabled={loading || historyIndex <= 0}
                /> */}
                {dots}
                {/* <LRButton
                    direction="right"
                    onClick={goToNextPair}
                    disabled={loading || historyIndex >= history.length}
                /> */}
            </div>
        );
    };
    

    const displayImages = () => {
        setLoading(true);
        setTimeout(() => {
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
        }, 0);
    };

    const goToPreviousPair = () => {
        if (historyIndex > 0) {
            setCurrentPair(history[historyIndex - 1]);
            setHistoryIndex(historyIndex - 1);
        }
    };
    
    const goToNextPair = () => {
        if (historyIndex + 1 < history.length) {
            setCurrentPair(history[historyIndex + 1]);
            setHistoryIndex(historyIndex + 1);
        } else {
            // If at the end of history, display a new pair
            displayImages();
        }
    };

    const selectImage = (index) => {
        const selectedImage = currentPair[index - 1];
        setSelectedImage(selectedImage);
        console.log("Image selected: ", selectedImage);

        onSelectionComplete({
            image1: currentPair[0],
            image2: currentPair[1],
            selectedImage: selectedImage,
            comparisonContext,
        });
    
        setTimeout(() => {
            displayImages();
        }, 100);

        setComparisonCount(prevCount => {
            const newCount = prevCount + 1;
            if (newCount >= maxComparisons) {
                onComplete(); 
            }
            return newCount;
        });
    };

    const recordEqualSelection = () => {
        if (currentPair.length === 2) {
            console.log("Equal selected for: ", currentPair);

            onSelectionComplete({
                image1: currentPair[0],
                image2: currentPair[1],
                selection: 'equal',
                comparisonContext,
            });
    
            setComparisonCount(prevCount => {
                const newCount = prevCount + 1;
                if (newCount >= maxComparisons) {
                    onComplete();
                    return prevCount; 
                } else {
                    displayImages(); 
                    return newCount;
                }
            });
        } else {
            console.log("No image pair is currently displayed.");
        }
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

    return (
        <div className="image-comparison-container">
            <div className="image-comparison-content"> 
                <h2>6A. When using your current mobility aid, which one is easier to pass?</h2>
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