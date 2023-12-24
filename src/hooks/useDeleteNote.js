import { useMutation, useQueryClient } from "@tanstack/react-query";
import sendRequest from "../services/apiPostgres";
import toast from "react-hot-toast";

function useDeleteNote() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteNote } = useMutation({
    mutationFn: (id) => sendRequest("/delete", "DELETE", { id: id }),
    onSuccess: () => {
      toast.success("Review successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteNote };
}

export default useDeleteNote;
