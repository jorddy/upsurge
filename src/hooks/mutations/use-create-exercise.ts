import { useMutation } from "react-query";
import { ExerciseType } from "@/shared/exercise-validator";
import {
  CreateExerciseErrors,
  CreateExerciseType
} from "@/shared/create-exercise-validator";

export const useCreateExercise = () =>
  useMutation<ExerciseType, CreateExerciseErrors, CreateExerciseType>(
    async data => {
      const res = await fetch("/api/exercise/create", {
        method: "POST",
        body: JSON.stringify(data)
      });

      if (!res.ok) throw await res.json();
      return await res.json();
    }
  );
