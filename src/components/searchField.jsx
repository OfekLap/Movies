import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import { useQueryClient } from "@tanstack/react-query";

function SearchField() {
  const [search, setSearch] = useState("");
  const { setSearchTerm } = useContext(UserContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSearch = (e) => {
    queryClient.invalidateQueries({ queryKey: ["movies"] });
    e.preventDefault();
    if (search.trim() !== "") {
      setSearchTerm(search);
      navigate("/allMovies");
    }
  };
  return (
    <form className="flex gap-5 ">
      <input
        type="text"
        placeholder="Search..."
        className="w-240 h-30 bg-slate-900 placeholder-teal-50 rounded-full border-solid border-5 border-cyan-100"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className=" bg-slate-900 rounded-full text-teal-50 border-solid border-5 border-cyan-100 w-30"
        type="submit"
        onClick={(e) => handleSearch(e)}
      >
        Search
      </button>
    </form>
  );
}

export default SearchField;
