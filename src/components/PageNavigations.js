import React from 'react';
import NavigationButton from './NavigationButton'; 
import './PageNavigations.css'; 

const PageNavigations = ({ onPrevious, onNext }) => {
  return (
    <div className="navigation-controls">
      <NavigationButton direction="up" onClick={onPrevious} />
      <NavigationButton direction="down" onClick={onNext} />
    </div>
  );
};

export default PageNavigations;
