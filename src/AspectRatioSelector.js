import React from 'react'

const AspectRatioSelector = ({ onAspectRatioChange }) => {
    return (
      <div className="aspect-ratio-selector">
        <button className='button' onClick={() => onAspectRatioChange(16 / 9)}>16:9</button>
        <button className='button' onClick={() => onAspectRatioChange(4 / 3)}>4:3</button>
        <button className='button' onClick={() => onAspectRatioChange(1 / 1)}>1:1</button>
      </div>
    );
  };

export default AspectRatioSelector