import { useQuery } from "@tanstack/react-query";

async function fetchReviews(title) {
  const response = await fetch(`http://localhost:4000/getNotes?title=${title}`);
  if (!response.ok) {
    throw new Error("Unable to fetch reviews");
  }
  return response.json();
}

function useGetNotes(title) {
  const {
    isLoading: isGettingNotes,
    data: notes,
    error,
  } = useQuery({
    queryKey: ["notes", title],
    queryFn: () => fetchReviews(title),
  });
  return { isGettingNotes, notes, error };
}

export default useGetNotes;
