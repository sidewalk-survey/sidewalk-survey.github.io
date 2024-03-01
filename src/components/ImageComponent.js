import React, { useState, useEffect, useRef } from 'react';
import './ImageComponent.css'; // Make sure to create a corresponding CSS file

const PS_CROP_SIZE = {
  width: 720,
  height: 480,
};

const ImageComponent = ({ cropMetadata }) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);

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
    updateSize(); // Initial size update
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const getLabelPosition = () => {
    // Calculate the label's position as a percentage of the image's dimensions
    const labelXPercent = (cropMetadata.CanvasX / PS_CROP_SIZE.width) * 100;
    const labelYPercent = (cropMetadata.CanvasY / PS_CROP_SIZE.height) * 100;
    return { left: `${labelXPercent}%`, top: `${labelYPercent}%` };
  };

  const { left, top } = getLabelPosition();

  return (
    <div className="image-component-container" style={{ position: 'relative' }}>
      <img 
        ref={imageRef}
        className="crop-image" 
        src={`${process.env.PUBLIC_URL}/crops/gsv-${cropMetadata.City}-${cropMetadata.LabelID}-${cropMetadata.LabelTypeID}.png`} 
        alt="Crop"
        onLoad={() => setImageSize({ 
          width: imageRef.current.offsetWidth, 
          height: imageRef.current.offsetHeight 
        })}
      />
      <div className="label-marker" style={{ position: 'absolute', left, top }}></div>
    </div>
  );
};

export default ImageComponent;
