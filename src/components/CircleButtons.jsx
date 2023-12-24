import React, { useState, useEffect } from "react";

function CircleButtons(props) {
  const [activeButton, setActiveButton] = useState("");
  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);

  useEffect(() => {
    // Reset active button when isSubmitted changes

    if (props.isSubmitted) {
      setActiveButton("");
    }
  }, [props.isSubmitted]);

  function handleButtonClick(number) {
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
  }

  return (
    <div className=" flex gap-3 px-3 mt-2 h-40">
      {numbers.map((number) => (
        <button
          key={number}
          className={`text-stone-200 rounded-full w-9 h-8 hover:bg-stone-500 transition-all ${
            activeButton === number ? "bg-stone-500 active" : "bg-stone-700"
          }`}
          onClick={() => handleButtonClick(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
}

export default CircleButtons;
