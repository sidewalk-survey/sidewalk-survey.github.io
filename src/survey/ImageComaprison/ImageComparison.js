//ImageComparison.js
import React, { useState, useEffect, useRef } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import PageNavigations from '../../components/PageNavigations';
import ResponseButtons from '../../components/ResponseButtons';
import ImageComponent from '../../components/ImageComponent';
import './ImageComparison.css';

const ImageComparison = ({ stepNumber, answers, nextStep, previousStep, images, onSelectionComplete, comparisonContext, onComplete }) => {
    const [currentPair, setCurrentPair] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [history, setHistory] = useState([]); 
    const [historyIndex, setHistoryIndex] = useState(-1); 
    const [maxComparisons, setMaxComparisons] = useState(0);
    const [hoverButton, setHoverButton] = useState(null);
    const [comparisonSelectionMade, setComparisonSelectionMade] = useState(false);

    const mobilityAid = answers.mobilityAid.toLowerCase();

    useEffect(() => {
        const n = images.length;
        const calculatedComparisons = (n * (n - 1)) / 2;
        setMaxComparisons(calculatedComparisons);
        displayImages();
    }, [images]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'ArrowLeft') {
                selectLeftImage();
            } else if (event.key === 'ArrowRight') {
                selectRightImage();
            } else if (event.key === 'ArrowDown') {
                recordEqualSelection();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentPair]);

    const handleMouseEnter = (button) => {
        setHoverButton(button);
    };

    const handleMouseLeave = () => {
        setHoverButton(null);
    };

    const getRandomImagePair = () => {
        if (!images || images.length < 2) {
            return [];
        }
        let attempts = 0;
        let pair;
        do {
            pair = [images[Math.floor(Math.random() * images.length)], images[Math.floor(Math.random() * images.length)]];
            attempts++;
            if (attempts > 100) {
                break;
            }
        } while (
            pair[0].LabelID === pair[1].LabelID || 
            history.some(h => 
                (h[0].LabelID === pair[0].LabelID && h[1].LabelID === pair[1].LabelID) || 
                (h[0].LabelID === pair[1].LabelID && h[1].LabelID === pair[0].LabelID))
        );
    
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
        setComparisonSelectionMade(false);
        let nextPair;
        if (historyIndex + 1 < history.length) {
            nextPair = history[historyIndex + 1];
            setHistoryIndex(historyIndex + 1);
        } else {
            nextPair = getRandomImagePair();
            if (nextPair.length > 0) {
                const newHistory = [...history, nextPair];
                setHistory(newHistory);
                setHistoryIndex(newHistory.length - 1);
            }
        }
        setComparisonSelectionMade(false);
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
        setComparisonSelectionMade(true);
    };

    const selectLeftImage = () => {
        if (currentPair.length === 2) {
            selectImage(1);
        }
    };

    const selectRightImage = () => {
        if (currentPair.length === 2) {
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
        }
        setComparisonSelectionMade(true);
    };

    const handlePreviousClick = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setCurrentPair(history[historyIndex - 1]);
        }
    };

    const handleNextClick = () => {
        if (comparisonSelectionMade && (historyIndex < history.length - 1 || historyIndex < maxComparisons - 1)) {
            if (historyIndex < history.length - 1) {
                setHistoryIndex(historyIndex + 1);
                setCurrentPair(history[historyIndex + 1]);
            } else {
                displayImages();
            }
        }
    };

    const renderDotsAndNavigation = () => {
        const activeColor = '#0d9488'; // Teal color
        const disabledColor = '#D8DEE9'; // Grey color

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', padding: '4px 0' }}>
                <CaretLeft
                    size={24}
                    onClick={handlePreviousClick}
                    style={{
                        cursor: historyIndex > 0 ? 'pointer' : 'not-allowed',
                        color: historyIndex > 0 ? activeColor : disabledColor
                    }}
                />
                {renderComparisonDots()}
                <CaretRight
                    size={24}
                    onClick={handleNextClick}
                    style={{
                        cursor: (historyIndex < history.length - 1 || historyIndex < maxComparisons - 1) && comparisonSelectionMade ? 'pointer' : 'not-allowed',
                        color: (historyIndex < history.length - 1 || historyIndex < maxComparisons - 1) && comparisonSelectionMade ? activeColor : disabledColor
                    }}
                />
                {console.log("Right arrow enabled:", (historyIndex < history.length - 1 || historyIndex < maxComparisons - 1) && comparisonSelectionMade)}
                {/* log more */}
                {console.log("combo of 2 below", (historyIndex < history.length - 1 || historyIndex < maxComparisons - 1) )}
                {console.log("historyIndex:", historyIndex < history.length - 1)}
                {console.log("maxComparisons:", historyIndex < maxComparisons - 1)}
                {console.log("comparisonSelectionMade:", comparisonSelectionMade)}

            </div>
        );
    };

    return (
        <div className="question-container">
            <div className="image-comparison-content"> 
                <h2>{`${stepNumber}. When using your `}<strong>{mobilityAid}</strong>{`, which one do you feel more confident passing?`}</h2>
                <p className="text-instruction text-center mb-4 text-gray-600">If not confident in passing either, please select 'the same'.</p>
                <div className="comparison-twin">
                {currentPair.map((imageData, index) => (
                        <div 
                            className={`comparison-image-wrapper ${hoverButton === (index === 0 ? 'left' : 'right') ? 'border-teal-400 glow-shadow' : ''}`}
                            key={imageData.LabelID}
                            style={{ borderWidth: hoverButton === (index === 0 ? 'left' : 'right') ? '4px' : '4px' }}
                            onClick={() => selectImage(index + 1)}
                        >
                                <ImageComponent cropMetadata={imageData} />
                        </div>
                    ))}
                </div>
                {renderDotsAndNavigation()}
                <ResponseButtons
                gap="24px"
                disabled={loading} 
                buttons={[
                    {
                    text: 'Left Image',
                    shortcut: '←',
                    onClick: selectLeftImage,
                    onMouseEnter: () => handleMouseEnter('left'),
                    onMouseLeave: handleMouseLeave,
                    },
                    {
                    text: 'The Same',
                    shortcut: '↓',
                    onClick: recordEqualSelection,
                    onMouseEnter: () => handleMouseEnter('equal'),
                    onMouseLeave: handleMouseLeave,
                    variant: 'outlined',
                    },
                    {
                    text: 'Right Image',
                    shortcut: '→',
                    onClick: selectRightImage,
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
