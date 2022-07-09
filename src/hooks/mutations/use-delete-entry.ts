import { QueryClient, useMutation } from "react-query";
import { GenericResponse, IdErrors, IdInput } from "@/utils/validators";
import toast from "react-hot-toast";

export const useDeleteEntry = (
  queryClient: QueryClient,
  page: "workout" | "exercise",
  id: string
) =>
  useMutation<GenericResponse, IdErrors, IdInput>(
    async data => {
      const res = await fetch("/api/entry/delete-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw await res.json();
      return await res.json();
    },
    {
      onMutate: () => toast.loading("Deleting entry..."),
      onSuccess: () => {
        if (page === "exercise") {
          queryClient.invalidateQueries(["exercise-by-id", id]);
        }

        if (page === "workout") {
          queryClient.invalidateQueries(["workout-by-id", id]);
        }

        toast.dismiss();
        toast.success("Successfully deleted entry");
      }
    }
  );
