import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchField = (props) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  console.log("render");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:4000/search?title=${searchTerm}`
      );
      console.log("Search results:", response.data);
      props.onSearchData(response.data);
      navigate("/movie");
      // Process the response or set state with the received data
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, set an error state, or display a message to the user
    }
  };

  return (
    <form onSubmit={(e) => handleSearch(e)}>
      <input
        type="text"
        placeholder="Search..."
        className="input-field"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchField;
