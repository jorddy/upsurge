import { useQuery } from "react-query";
import { fetcher } from "@/server/fetcher";
import { ExerciseById } from "@/server/data/get-exercise-by-id";
import { IdErrors } from "@/shared/id-validator";

export const useExerciseById = (id: string) =>
  useQuery<ExerciseById, IdErrors>(
    ["exercise-by-id", id],
    () => fetcher(`/api/data/get-exercise-by-id?id=${id}`),
    {
      enabled: !!id
    }
  );
