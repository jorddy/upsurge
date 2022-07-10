import { useQuery } from "react-query";
import { fetcher } from "@/server/fetcher";
import { WorkoutById } from "@/server/data/get-workout-by-id";
import { IdErrors } from "@/shared/id-validator";

export const useWorkoutById = (id: string | undefined) =>
  useQuery<WorkoutById, IdErrors>(
    ["workout-by-id", id],
    async () => fetcher(`/api/data/get-workout-by-id?id=${id}`),
    {
      enabled: !!id
    }
  );
