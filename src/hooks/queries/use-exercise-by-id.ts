import { useQuery } from "react-query";
import { ExerciseById } from "@/pages/api/exercise/get-exercise-by-id";
import { ByIdErrors } from "@/utils/validators";

export const useExerciseById = (id: string) =>
  useQuery<ExerciseById, ByIdErrors>(
    ["exercise-by-id", id],
    async () => {
      const res = await fetch(`/api/exercise/get-exercise-by-id?id=${id}`);
      if (!res.ok) throw await res.json();

      return await res.json();
    },
    {
      enabled: !!id
    }
  );
