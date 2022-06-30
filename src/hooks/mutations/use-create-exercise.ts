import toast from "react-hot-toast";
import { QueryClient, useMutation } from "react-query";
import { ExerciseType } from "@/shared/exercise-validator";
import {
  CreateExerciseErrors,
  CreateExerciseType
} from "@/shared/create-exercise-validator";

export const useCreateExercise = (queryClient: QueryClient) =>
  useMutation<ExerciseType, CreateExerciseErrors, CreateExerciseType>(
    async data => {
      const res = await fetch("/api/exercises/create", {
        method: "POST",
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
