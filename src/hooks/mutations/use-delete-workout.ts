import { QueryClient, useMutation } from "react-query";
import { mutate } from "@/utils/mutate";
import { WorkoutType } from "../queries/validators";
import { IdError, IdInput } from "./validators";

export const useDeleteWorkout = (queryClient: QueryClient) =>
  useMutation<WorkoutType, IdError, IdInput>(
    data => mutate("/api/data/delete-workout", data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["workouts"]);
        queryClient.invalidateQueries(["latest-workouts"]);
      }
    }
  );
