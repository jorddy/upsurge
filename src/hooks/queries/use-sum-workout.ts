import { useQuery } from "react-query";
import { fetcher } from "@/server/fetcher";
import { SumEntries } from "@/server/data/sum-entries";
import { IdErrors } from "@/shared/id-validator";

export const useSumWorkout = (workoutId: string | undefined) =>
  useQuery<SumEntries, IdErrors>(
    ["sum-workout", workoutId],
    () => fetcher(`/api/data/sum-workout?id=${workoutId}`),
    {
      enabled: !!workoutId
    }
  );
