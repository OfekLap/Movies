import React, { useState, useEffect } from 'react';
import axios from 'axios';


const MyReviews = ({ email }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/myReviews?email=${email}`);
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error, set an error state, or display a message to the user
      }
    };
  
    fetchMyReviews();
  }, [email]);
  
  return (
    <div>
      <h2>My Reviews</h2>
      {notes.map((noteItem) => (
        <div key={noteItem.id}>
          <p>Title: {noteItem.title}</p>
          <p>Content: {noteItem.content}</p>
          <p>Rating: {noteItem.rating}</p>
          {/* Add any other fields you want to display */}
        </div>
      ))}
    </div>
  );
};

export default MyReviews;
