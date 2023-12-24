import { useQuery } from "@tanstack/react-query";

async function fetchMovies(query) {
  const KEY = "25bec37c";

  let data = [];
  try {
    const queryType = query.slice(0, 2) === "tt" ? "i" : "t";
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${KEY}&${queryType}=${query}`
    );

    if (!res.ok) {
      throw new Error("Something went wrong with fetching movies");
    }
    data = await res.json();

    if (data.Response === "False") throw new Error("Movie not found");
  } catch (err) {
    console.log(err.message);
  }
  return data;
}

function useMovieDetails(query) {
  const {
    isLoading: isSearching,
    data,
    error: searchError,
  } = useQuery({
    queryKey: ["movieDetails", query],
    queryFn: () => fetchMovies(query),
  });

  return { isSearching, data, searchError };
}

export default useMovieDetails;
