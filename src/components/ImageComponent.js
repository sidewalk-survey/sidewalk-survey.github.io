import React, { useState, useEffect, useRef } from 'react';
import { Tooltip } from "@material-tailwind/react";
import './ImageComponent.css';

const PS_CROP_SIZE = {
  width: 720,
  height: 480,
};

const ImageComponent = ({ cropMetadata, isFirstImage}) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageRef = useRef(null);
  const [tooltipVisible, setTooltipVisible] = useState(isFirstImage);

  // useEffect(() => {
  //   setIsImageLoaded(false); // Reset image load state whenever cropMetadata changes
  // }, [cropMetadata]);

  useEffect(() => {
    const updateSize = () => {
      if (imageRef.current) {
        setImageSize({
          width: imageRef.current.offsetWidth,
          height: imageRef.current.offsetHeight
        });
      }
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const getLabelPosition = () => {
    const labelXPercent = (cropMetadata.CanvasX / PS_CROP_SIZE.width) * 100;
    const labelYPercent = (cropMetadata.CanvasY / PS_CROP_SIZE.height) * 100;
    return { left: `${labelXPercent}%`, top: `${labelYPercent}%` };
  };

  const { left, top } = getLabelPosition();

  useEffect(() => {
    if (isFirstImage && isImageLoaded) {
      const timer = setTimeout(() => setTooltipVisible(false), 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isFirstImage, isImageLoaded]);

  return (
    <div className="image-component-container" style={{ position: 'relative' }}>
      <img 
        ref={imageRef}
        className="crop-image" 
        src={`${process.env.PUBLIC_URL}/crops/gsv-${cropMetadata.City}-${cropMetadata.LabelID}-${cropMetadata.LabelTypeID}.png`} 
        alt="Crop"
        onLoad={() => {
          setImageSize({ 
            width: imageRef.current.offsetWidth, 
            height: imageRef.current.offsetHeight 
          });
          setIsImageLoaded(true);
        }}
      />
      {tooltipVisible && isImageLoaded && (
        <div className="tooltip text-w" style={{ left, top }}>
          Please focus on this dot when evaluating images
        </div>
      )}
      <div className={`label-marker ${isImageLoaded ? 'visible' : ''}`} style={{ left, top }}></div>
    </div>
  );
};

export default ImageComponent;
