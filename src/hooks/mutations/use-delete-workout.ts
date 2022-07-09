import { QueryClient, useMutation } from "react-query";
import { GenericResponse, IdErrors, IdInput } from "@/utils/validators";
import toast from "react-hot-toast";

export const useDeleteWorkout = (queryClient: QueryClient) =>
  useMutation<GenericResponse, IdErrors, IdInput>(
    async data => {
      const res = await fetch("/api/workout/delete-workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw await res.json();
      return await res.json();
    },
    {
      onMutate: () => toast.loading("Deleting workout..."),
      onSuccess: () => {
        queryClient.invalidateQueries(["workouts"]);
        queryClient.invalidateQueries(["latest-workouts"]);
        toast.dismiss();
        toast.success("Successfully deleted workout");
      }
    }
  );
