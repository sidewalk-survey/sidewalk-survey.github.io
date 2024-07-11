import React, { useState, useEffect, useRef } from 'react';
import './ImageComponent.css';

const PS_CROP_SIZE = {
  width: 720,
  height: 480,
};

const ImageComponent = ({ cropMetadata, isFirstImage }) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const updateSize = () => {
      if (imageRef.current) {
        setImageSize({
          width: imageRef.current.offsetWidth,
          height: imageRef.current.offsetHeight,
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
            height: imageRef.current.offsetHeight,
          });
          setIsImageLoaded(true);
        }}
      />
      {isFirstImage && isImageLoaded && (
        <div className="tooltip text-w" style={{ left, top }}>
          Please focus on this dot when evaluating images
        </div>
      )}
      <div className={`label-marker ${isImageLoaded ? 'visible' : ''}`} style={{ left, top }}></div>
    </div>
  );
};

export default ImageComponent;
