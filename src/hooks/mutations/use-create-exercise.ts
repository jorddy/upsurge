import { useMutation } from "react-query";
import { CreateExercise } from "@/pages/api/exercise/create-exercise";
import { CreateExerciseErrors, CreateExerciseInput } from "./validators";

export const useCreateExercise = () =>
  useMutation<CreateExercise, CreateExerciseErrors, CreateExerciseInput>(
    async data => {
      const res = await fetch("/api/exercise/create-exercise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw await res.json();

      return await res.json();
    }
  );
