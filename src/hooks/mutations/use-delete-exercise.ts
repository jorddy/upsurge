import { QueryClient, useMutation } from "react-query";
import { GenericResponse, IdErrors, IdInput } from "@/utils/validators";
import toast from "react-hot-toast";

export const useDeleteExercise = (queryClient: QueryClient) =>
  useMutation<GenericResponse, IdErrors, IdInput>(
    async data => {
      const res = await fetch("/api/exercise/delete-exercise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw await res.json();
      return await res.json();
    },
    {
      onMutate: () => toast.loading("Deleting exercise..."),
      onSuccess: () => {
        queryClient.invalidateQueries(["exercises"]);
        toast.dismiss();
        toast.success("Successfully deleted exercise");
      }
    }
  );
