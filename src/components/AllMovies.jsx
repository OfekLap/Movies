import { useState } from "react";
import useMovies from "../hooks/useMovies";
import MovieRow from "./MovieRow";
import useMovieDetails from "../hooks/useMovieDetails";
import Movie from "./Movie";

function AllMovies({ searchTerm }) {
  const [selectedID, setSelectedID] = useState(null);
  const { data, isSearching, searchError } = useMovieDetails(selectedID);

  const {
    data: { Search: movies } = {},
    isLoading,
    error,
  } = useMovies(searchTerm);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="flex">
      <ul className="w-50 ml-20 my-10 ">
        {Array.isArray(movies) &&
          movies.map((movie) => (
            <li
              onClick={() => setSelectedID(movie.imdbID)}
              key={movie.imdbID}
              className="border-stone-800 border-1"
            >
              <MovieRow movie={movie} />
            </li>
          ))}
      </ul>
      {selectedID !== null && !isSearching && <Movie movie={data} />}
      {isSearching && <h1>Loading...</h1>}
      {searchError && <h1>{searchError}</h1>}
    </div>
  );
}

export default AllMovies;
