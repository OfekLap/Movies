import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

async function addNoteMutation(noteData) {
  try {
    const response = await fetch("http://localhost:4000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Request error:", error);
    throw error;
  }
}

function useAddNote() {
  const queryClient = useQueryClient();
  const addNote = async (noteData) => {
    try {
      const result = await addNoteMutation(noteData);
      toast.success("New review successfully added");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      return result;
    } catch (err) {
      toast.error(err.message);
      // Perform any additional actions on error
      throw err;
    }
  };

  return { addNote };
}

export default useAddNote;
