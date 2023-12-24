import useMyReviews from "../hooks/useMyReviews";
import useDeleteNote from "../hooks/useDeleteNote";
import { useQueryClient } from "@tanstack/react-query";

function MyReviews({ email }) {
  const queryClient = useQueryClient();

  const { deleteNote } = useDeleteNote();
  const { isLoading, reviews, error } = useMyReviews(email);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching reviews</p>;
  }

  return (
    <div>
      <h2 className="mt-3 font-bold underline text-stone-100 text-4xl ml-48">
        My Reviews
      </h2>
      <div className="flex flex-col gap-3 ml-32 w-80 mt-4 ">
        {reviews.map((review) => (
          <div
            className="p-4 bg-stone-400 text-lg"
            key={review.id}
            style={{ border: "2px solid black" }}
          >
            <p>Title: {review.title}</p>
            <p>Content: {review.content}</p>
            <p>Rating: {review.rating}</p>
            <button
              className="underline"
              onClick={() => {
                deleteNote(review.id);
                queryClient.invalidateQueries({ queryKey: ["myReviews"] });
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyReviews;
