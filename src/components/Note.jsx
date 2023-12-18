import React from 'react';

const Note = ({ id, title, content, rating, onDelete }) => {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px 0' }}>
      <h3>{title}</h3>
      <p>{content}</p>
      {rating && (
        <div>
          <p>Rating: {rating}</p>
        </div>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Note;

