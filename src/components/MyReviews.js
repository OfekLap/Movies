import React from 'react';
import axios from 'axios';

const MyReviews = (props) => {
    const email = props.email;
    console.log("myReviews email is:" + email);

        const handleSearch = async () => {
          try {
            const response = await axios.get(`http://localhost:4000/myReviews?email=${email}`);
            console.log('Search results:', response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error, set an error state, or display a message to the user
          }
        };
    

  return (
    <div className="input-container">
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default MyReviews;