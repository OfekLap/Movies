import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './Note';
import CreateArea from './CreateArea';
function Review(props){
    const serverUrl = 'http://localhost:4000'; // Your server's URL
    function sendRequest(endpoint, method, data) {
        return axios({
          method: method,
          url: `${serverUrl}${endpoint}`,
          data: data,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .catch((error) => {
          console.error("Request error:", error);
          throw error;
        });
      }
    
      const [notes, setNotes] = useState([]);
      
    
      useEffect(() => {
        sendRequest(`/getNotes?title=${props.title}`, 'GET')
          .then((response) => {
            setNotes(response.data);
          })
          .catch((error) => {
            console.error('Error fetching notes:', error);
          });
      }, [props.title]); // Add props.title to the dependency array to re-fetch when it changes
      
    
    
    
      function addNote(newNote) {
        console.log(newNote);
        sendRequest('/add', 'POST', { newItem: newNote, email: props.email})
          .then((response) => {
            if (response.data.success) {
              setNotes((prevNotes) => [...prevNotes, response.data.newItem]);
            } else {
              console.error("Server response indicates an error:", response.data.error);
              // Handle the error on the client side, if needed.
            }
          })
          .catch((error) => {
            // Handle the request error, e.g., show an error message to the user.
          });
      }
    
      
    
      function deleteNote(id) {
        sendRequest('/delete', 'DELETE', { id: id })
          .then(() => {
            // Handle the deletion on the client side, e.g., by updating the state.
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
           
          })
          .catch((error) => {
            console.error('Error deleting note:', error);
          });
      }
      
      return(

        <div>
               {props.register && <CreateArea onAdd={addNote}  title={props.title}/>} 
                {notes.map((noteItem, index) => {
                  return (
                    <Note
                      key={noteItem.id}
                      id={noteItem.id}
                      title={noteItem.title}
                      content={noteItem.content}
                      rating={noteItem.rating}
                      onDelete={deleteNote}
                    />
                  );
                })}
              </div>
      );
      
}
 export default Review;