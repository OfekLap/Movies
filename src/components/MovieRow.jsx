function MovieRow({ movie }) {
  return (
    <>
      <div
        className="flex gap-5 bg-[#343a40] m-0 rounded-md pt-2
       hover:bg-stone-700 cursor-pointer"
      >
        <img
          src={movie.Poster}
          alt="movie poster"
          className="w-18 h-24 ml-7 py-2"
        />
        <div className="text-white-50 text-lg">
          <h1>{movie.Title}</h1>
          <h2>{movie.Year}</h2>
        </div>
      </div>
    </>
  );
}

export default MovieRow;
