import { useQuery } from "@tanstack/react-query";

async function fetchMovies(query) {
  const KEY = "25bec37c";

  let data = [];

  try {
    const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

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

function useMovies(query) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["movies", query],
    queryFn: () => fetchMovies(query),
  });

  return { isLoading, data, error };
}

export default useMovies;
