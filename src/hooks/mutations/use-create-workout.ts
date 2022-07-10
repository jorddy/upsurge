import { QueryClient, useMutation } from "react-query";
import { fetcher } from "@/server/fetcher";
import { CreateWorkout } from "@/server/data/create-workout";
import {
  CreateWorkoutErrors,
  CreateWorkoutInput
} from "@/shared/create-workout-validator";

export const useCreateWorkout = (queryClient: QueryClient) =>
  useMutation<CreateWorkout, CreateWorkoutErrors, CreateWorkoutInput>(
    data => fetcher("/api/data/create-workout", true, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["workouts"]);
        queryClient.invalidateQueries(["latest-workouts"]);
      }
    }
  );
