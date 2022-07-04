import toast from "react-hot-toast";
import { QueryClient, useMutation } from "react-query";
import { ExerciseType } from "../queries/validators";
import { CreateExerciseErrors, CreateExerciseType } from "./validators";

export const useCreateExercise = (queryClient: QueryClient) =>
  useMutation<ExerciseType, CreateExerciseErrors, CreateExerciseType>(
    async data => {
      const res = await fetch("/api/exercises/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw await res.json();
      return await res.json();
    },
    {
      onMutate: () => {
        toast.loading("Creating exercise...");
      },
      onError: error => {
        toast.dismiss();
        toast.error(Object.values(error.fieldErrors).join(", "));
      },
      onSuccess: () => {
        toast.dismiss();
        queryClient.invalidateQueries(["all-exercises"]);
      }
    }
  );
