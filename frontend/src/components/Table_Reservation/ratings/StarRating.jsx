import React, { useState } from 'react';

const StarRating = ({ initialRating = 0, onChange, readOnly = false }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (newRating) => {
    if (!readOnly) {
      setRating(newRating);
      if (onChange) {
        onChange(newRating);
      }
    }
  };

  const renderStar = (index) => {
    const filled = index <= (hoverRating || rating);
    return (
      <span
        key={index}
        className={`text-3xl cursor-pointer ${filled ? 'text-yellow-500' : 'text-gray-300'} ${readOnly ? 'cursor-default' : ''}`}
        onClick={() => handleClick(index)}
        onMouseEnter={() => !readOnly && setHoverRating(index)}
        onMouseLeave={() => !readOnly && setHoverRating(0)}
      >
        ★
      </span>
    );
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map(renderStar)}
    </div>
  );
};

export default StarRating; 