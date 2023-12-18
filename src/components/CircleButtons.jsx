import React, { useState, useEffect } from 'react';

function CircleButtons(props) {
  const [activeButton, setActiveButton] = useState("");
  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);

  useEffect(() => {
    // Reset active button when isSubmitted changes
    console.log("isSubmitted changed:", props.isSubmitted);
    if (props.isSubmitted) {
      setActiveButton("");
    }
  }, [props.isSubmitted]);
  

  const handleButtonClick = (number) => {
    console.log("Button clicked, isSubmitted:", props.isSubmitted);
    if (props.isSubmitted) {
      // If the form is submitted, do nothing
      return;
    }
  
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
          // Always apply 'active' class when the button is active
          className={`circle-button ${activeButton === number ? 'active' : ''}`}
          onClick={() => handleButtonClick(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
}

export default CircleButtons;


