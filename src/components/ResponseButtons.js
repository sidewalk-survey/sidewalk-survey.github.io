import React from 'react';
import { Button } from '@material-tailwind/react';

const ResponseButtons = ({ buttons, gap, disabled = false }) => {
  return (
    <div className="button-group" style={{ justifyContent: "center", display: 'flex', gap: gap }}>
      {buttons.map(({ text, onClick, onMouseEnter, onMouseLeave, variant = 'filled' }, index) => (
        <Button
          key={index}
          className="lg-font-size-button"
          color="teal"
          variant={variant}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          disabled={disabled}
          ripple="light"
        >
          {text}
        </Button>
      ))}
    </div>
  );
};

export default ResponseButtons;

