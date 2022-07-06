import { useQuery } from "react-query";
import { ByIdError, ExerciseType, exerciseValidator } from "./validators";

export const useExerciseById = (id: string) =>
  useQuery<ExerciseType, ByIdError>(
    ["exercise-by-id", id],
    async () => {
      const res = await fetch(`/api/exercise/get-exercise-by-id?id=${id}`);

      if (!res.ok) throw await res.json();

      return exerciseValidator.parse(await res.json());
    },
    {
      enabled: !!id
    }
  );
