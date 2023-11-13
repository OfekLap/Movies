import React, { useState, useEffect } from "react";
import CircleButtons from "./CircleButtons"; // Update the import to match the correct component name

function CreateArea(props) {
  const [note, setNote] = useState({
    title: props.title,
    content: "",
    rating: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Update the title when props.title changes
    setNote((prevNote) => ({
      ...prevNote,
      title: props.title
    }));
  }, [props.title]);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => ({
      ...prevNote,
      [name]: value
    }));
  }

  function submitNote(event) {
    setIsSubmitted(true);
    props.onAdd(note);

    setNote({
      title: props.title,
      content: "",
      // Remove rating from here, as it's set using the CircleButtons component
    });

    event.preventDefault();
  }

  function handleRating(number) {
    setNote((prevNote) => ({
      ...prevNote,
      rating: number
    }));
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title} // To display but not edit the title
          disabled  // Disable the title input
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
      <CircleButtons
        name="rating"
        value={note.rating}
        handleRating={handleRating}
        isSubmitted={isSubmitted}
      />
    </div>
  );
}

export default CreateArea;
