import React, { useContext } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { UserContext } from "./App";
import useGetNotes from "../hooks/useGetNotes";
import useAddNote from "../hooks/useAddNote";
import useDeleteNote from "../hooks/useDeleteNote";

function Review({ title, showCreateArea }) {
  const { isRegister } = useContext(UserContext);
  const { notes = [] } = useGetNotes(title);
  const { addNote } = useAddNote();
  const { deleteNote } = useDeleteNote();

  return (
    <div className="flex gap-3 flex-wrap">
      {isRegister && showCreateArea && (
        <CreateArea onAdd={addNote} title={title} />
      )}
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            content={noteItem.content}
            rating={noteItem.rating}
            userEmail={noteItem.user_email}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  );
}
export default Review;
