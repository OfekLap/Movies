import React from "react";
import { useContext } from "react";
import { UserContext } from "./App";
import { Link } from "react-router-dom";

function Post({ movie, setShowCreateArea }) {
  const { isRegister } = useContext(UserContext);
  return (
    <div className=" bg-stone-300 flex mt-4">
      <div className="mx-5 mb-3 mt-2 space-y-2">
        <h1 className="text-xl font-bold underline">{movie?.Title}</h1>
        <h3 className=" text-lg font-semibold">{movie?.Plot}</h3>
        <p>{`Genre: ${movie?.Genre}`}</p>
        <p>{`Released in: ${movie?.Released}`}</p>
        <p>{`Running time: ${movie?.Runtime}`}</p>
        <p>{`Directed by: ${movie?.Director}`}</p>
        <p>{`Story by: ${movie?.Writer}`}</p>
        <p>{`Starring: ${movie?.Actors}`}</p>
        <p>{`Awards: ${movie?.Awards ? movie?.Awards : "-"}`}</p>
        <p>{`The metascore is: ${movie?.Metascore}`}</p>
        <p>{`The imdb rating is: ${movie?.imdbRating}`}</p>
        {isRegister ? (
          <button
            className="underline font-semibold ml-40 mt-3"
            onClick={() => setShowCreateArea((show) => !show)}
          >
            Add a comment
          </button>
        ) : (
          <Link className="text-blue-800" to={"/login"}>
            Want to leave a comment? Login
          </Link>
        )}
      </div>
      <img className="w-64 mt-4 mr-3 h-56" src={movie?.Poster} alt="poster" />
    </div>
  );
}

export default Post;
