import React from "react";
import { useContext } from "react";
import { UserContext } from "./App";

function Note({ id, content, rating, onDelete, userEmail }) {
  const { userEmail: currentUser } = useContext(UserContext);
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
        margin: "10px 0",
      }}
      className=" bg-neutral-300 w-32"
    >
      <h3 className="font-semibold">{userEmail}</h3>
      <p>{content}</p>
      {rating && (
        <div>
          <p>Rating: {rating}</p>
        </div>
      )}
      {currentUser === userEmail && (
        <button className="font-semibold underline" onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
}

export default Note;
