import { QueryClient, useMutation } from "react-query";
import { fetcher } from "@/server/fetcher";
import { DeleteWorkout } from "@/server/data/delete-workout";
import { IdErrors, IdInput } from "@/shared/id-validator";

export const useDeleteWorkout = (queryClient: QueryClient) =>
  useMutation<DeleteWorkout, IdErrors, IdInput>(
    data => fetcher("/api/data/delete-workout", true, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["workouts"]);
        queryClient.invalidateQueries(["latest-workouts"]);
      }
    }
  );
