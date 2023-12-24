import React, { useState, useEffect, useContext } from "react";
import CircleButtons from "./CircleButtons";
import { UserContext } from "./App";

function CreateArea(props) {
  const { userEmail } = useContext(UserContext);
  const [note, setNote] = useState({
    title: props.title,
    content: "",
    rating: "",
    email: userEmail, // Assign userEmail to email property
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Update the title when props.title changes
    setNote((prevNote) => ({
      ...prevNote,
      title: props.title,
    }));
  }, [props.title]);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  useEffect(() => {
    setIsSubmitted(false);
  }, [isSubmitted]);

  function submitNote(event) {
    setIsSubmitted(true);

    if (userEmail) {
      props.onAdd({
        newItem: note,
        email: userEmail,
      });

      setNote({
        title: props.title,
        content: "",
      });
    } else {
      console.error("User email is undefined.");
    }

    event.preventDefault();
  }

  function handleRating(number) {
    setNote((prevNote) => ({
      ...prevNote,
      rating: number,
    }));
  }

  return (
    <div className="flex flex-col bg-stone-300 mt-3 h-48 w-[32rem]">
      <form className="flex flex-col ">
        <input
          className="text-center"
          name="title"
          onChange={handleChange}
          value={note.title}
          disabled
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
      </form>
      <CircleButtons
        name="rating"
        value={note.rating}
        handleRating={handleRating}
        isSubmitted={isSubmitted}
      />
      <button
        onClick={submitNote}
        className="text-stone-900 w-8 mb-2 font-semibold"
      >
        Add
      </button>
    </div>
  );
}

export default CreateArea;
