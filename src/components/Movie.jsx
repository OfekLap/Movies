import { useState } from "react";
import Post from "./Post";
import Review from "./Review";

function Movie({ movie }) {
  const [showCreateArea, setShowCreateArea] = useState(false);
  return (
    <div className="mt-4 max-w-lg ml-28">
      <Post movie={movie} setShowCreateArea={setShowCreateArea} />
      <Review title={movie?.Title} showCreateArea={showCreateArea} />
    </div>
  );
}

export default Movie;
