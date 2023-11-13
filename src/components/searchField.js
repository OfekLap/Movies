import React, { useState } from 'react';
import axios from 'axios';

const SearchField = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/search?title=${searchTerm}`);
      console.log('Search results:', response.data);
      props.onSearchData(response.data);
      // Process the response or set state with the received data
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error, set an error state, or display a message to the user
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Search..."
        className="input-field"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchField;
