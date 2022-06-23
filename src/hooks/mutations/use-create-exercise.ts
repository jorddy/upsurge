import { QueryClient, useMutation } from "react-query";
import { ExerciseType } from "@/shared/exercise-validator";
import {
  CreateExerciseErrors,
  CreateExerciseType
} from "@/shared/create-exercise-validator";
import toast from "react-hot-toast";

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
      onError: error => {
        toast.error(Object.values(error.fieldErrors).join(", "));
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["all-exercises"]);
      }
    }
  );
