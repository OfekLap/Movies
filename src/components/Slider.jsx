import React from "react";
import { useState } from "react";
import useMovieDetails from "../hooks/useMovieDetails";
import Movie from "./Movie";

const imgArr = [
  {
    src: "https://m.media-amazon.com/images/M/MV5BMGU5OWEwZDItNmNkMC00NzZmLTk1YTctNzVhZTJjM2NlZTVmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    alt: "City of god",
  },
  {
    src: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    alt: "The godfather",
  },
  {
    src: "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
    alt: "Fight club",
  },
  {
    src: "https://m.media-amazon.com/images/M/MV5BODJkZTZhMWItMDI3Yy00ZWZlLTk4NjQtOTI1ZjU5NjBjZTVjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
    alt: "Kung Fu Panda",
  },
  {
    src: "https://m.media-amazon.com/images/M/MV5BMTUyNzgxNjg2M15BMl5BanBnXkFtZTgwMTY1NDI1NjE@._V1_SX300.jpg",
    alt: "Kung Fu Panda 3",
  },
  {
    src: "https://m.media-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
    alt: "The Big Short",
  },
  {
    src: "https://m.media-amazon.com/images/M/MV5BMDliOTIzNmUtOTllOC00NDU3LWFiNjYtMGM0NDc1YTMxNjYxXkEyXkFqcGdeQXVyNTM3NzExMDQ@._V1_SX300.jpg",
    alt: "Big Hero 6",
  },
  {
    src: "https://m.media-amazon.com/images/M/MV5BMDQ1ODM5MTMtMjAwYi00ZGUxLTliNTMtN2ZhODAwMjVhMTRlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
    alt: "Big",
  },
  {
    src: "https://m.media-amazon.com/images/M/MV5BZTNlNTQzMGEtYjU4Yi00MzEzLThmMTQtNmM0NzcxZWI1MTk0XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
    alt: "Big Fish",
  },
  {
    src: "https://m.media-amazon.com/images/M/MV5BOWJmZTExZTYtZjg1Mi00ZDFmLTk3MTYtZTUwYzkzODA2M2ZmXkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_SX300.jpg",
    alt: "Big Daddy",
  },

  {
    src: "https://m.media-amazon.com/images/M/MV5BNmM4ODU1MzItODYyYi00Y2U0LWFjZjItYTRhZWIwOGMyZTRhXkEyXkFqcGdeQXVyNjc2NTQ4Nzk@._V1_SX300.jpg",
    alt: "House of Cards",
  },
  {
    src: "https://m.media-amazon.com/images/M/MV5BMDA4NjQzN2ItZDhhNC00ZjVlLWFjNTgtMTEyNDQyOGNjMDE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
    alt: "House",
  },
  {
    src: "https://m.media-amazon.com/images/M/MV5BZjBiOGIyY2YtOTA3OC00YzY1LThkYjktMGRkYTNhNTExY2I2XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg",
    alt: "House of the Dragon",
  },
  {
    src: "https://m.media-amazon.com/images/M/MV5BMjI5ODkyMjA2Nl5BMl5BanBnXkFtZTcwNTcyNTgzNw@@._V1_SX300.jpg",
    alt: "Safe House",
  },
  {
    src: "https://m.media-amazon.com/images/M/MV5BYzdlMTMyZWQtZWNmMC00MTJiLWIyMWMtM2ZlZDdlYzZhNTc0XkEyXkFqcGdeQXVyMTMzNDE5NDM2._V1_SX300.jpg",
    alt: "House of Gucci",
  },
  {
    src: "https://m.media-amazon.com/images/M/MV5BNTE2YzljYzAtMzRlMi00ZmY1LThiMTMtZGQ3OTI3MTNmOWI2XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
    alt: "Madagascar: Escape 2 Africa",
  },
];

function Slider({ children }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { data, isSearching, searchError } = useMovieDetails(selectedMovie);

  const [cur, setCur] = useState(4);
  return (
    <div className="flex flex-col ">
      <h1 className="text-stone-300 text-3xl underline mt-8 mb-2 ml-64">
        {children}
      </h1>
      <div
        className={`flex flex-row items-center justify-center mr-28 ${
          selectedMovie === null ? "items-center" : ""
        }`}
      >
        <ul className="inline-flex gap-3 border-4 border-solid border-stone-300 p-4 rounded-xl max-h-96">
          <button
            className="bg-stone-500 rounded-full w-8 h-8 mt-40 hover:bg-neutral-400"
            onClick={() => {
              setCur((prev) => (prev <= 4 ? imgArr.length - 1 : prev - 5));
              setSelectedMovie(null);
            }}
          >
            &lt;
          </button>

          {imgArr.map((image, i) =>
            i <= cur && i >= cur - 4 ? (
              <li key={i}>
                <img
                  className="shadow h-80 cursor-pointer"
                  src={image.src}
                  alt={image.alt}
                  onClick={() =>
                    setSelectedMovie((prev) =>
                      prev === image.alt ? null : image.alt
                    )
                  }
                />
                <h2 className="text-white text-lg pl-8 pt-2">{image.alt}</h2>
              </li>
            ) : null
          )}
          <button
            onClick={() => {
              setCur((prev) => (prev >= imgArr.length - 1 ? 4 : prev + 5));
              setSelectedMovie(null);
            }}
            className="bg-stone-500 rounded-full w-8 h-8 mt-40 hover:bg-neutral-400"
          >
            &gt;
          </button>
        </ul>

        {selectedMovie !== null && !isSearching && <Movie movie={data} />}
      </div>
    </div>
  );
}

export default Slider;
