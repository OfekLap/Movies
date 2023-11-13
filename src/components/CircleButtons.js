import React, { useState } from 'react';

function CircleButtons(props) {
  const [activeButton, setActiveButton] = useState("");

  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);

  const handleButtonClick = (number) => {
    if (activeButton === number) {
      // If the same button is clicked, deactivate it
      setActiveButton("");
      props.handleRating("");
    } else {
      // Otherwise, set the active button to the clicked number
      setActiveButton(number);
      props.handleRating(number);
    }
    console.log(`Button ${number} clicked`);
  };

  return (
    <div className="circle-buttons">
      {numbers.map((number) => (
        <button
          key={number}
          className={`circle-button ${activeButton === number && !props.isSubmitted ? 'active' : ''}`}
          onClick={() => handleButtonClick(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
}

export default CircleButtons;
