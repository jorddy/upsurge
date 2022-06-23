import { useMutation } from "react-query";
import { ExerciseType } from "@/shared/exercise-validator";
import {
  CreateExerciseErrors,
  CreateExerciseType
} from "@/shared/create-exercise-validator";
import toast from "react-hot-toast";

export const useCreateExercise = () =>
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
        // TODO: Can we find a better way to do errors??
        if (error.fieldErrors.currentWeight)
          toast.error(error.fieldErrors.currentWeight.join(", "));
      }
    }
  );
