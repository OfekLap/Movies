import { useQuery } from "@tanstack/react-query";

async function fetchReviews(email) {
  const response = await fetch(
    `http://localhost:4000/myReviews?email=${email}`
  );
  if (!response.ok) {
    throw new Error("Unable to fetch reviews");
  }
  return response.json();
}

function useMyReviews(email) {
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ["myReviews", email],
    queryFn: () => fetchReviews(email),
  });
  return { isLoading, reviews, error };
}
export default useMyReviews;
