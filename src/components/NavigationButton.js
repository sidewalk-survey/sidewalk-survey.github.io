import React from 'react';
import { Button } from '@material-tailwind/react';
import { CaretUp, CaretDown } from 'phosphor-react';

const NavigationButton = ({ direction, onClick, style = {} }) => {
  const isUp = direction === 'up';
  const Icon = isUp ? CaretUp : CaretDown;
  const title = isUp ? 'Prev Question' : 'Next Question'; // Added a title variable

  return (
    <Button
      color="teal"
      variant="text"
      size='sm'
      onClick={onClick}
      style={{
        // aspectRatio: '1 / 1',
        // change radius to 0
        borderRadius: 0,
        padding: '8px',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: '10px',
        backgroundColor: '#e0f2f1',
        color: '#4db6ac',
        ...style, // Spread additional styles if any
      }}
      title={title} // Added the title attribute
    >
      <Icon size={24} weight="bold" />
    </Button>
  );
};

export default NavigationButton;
