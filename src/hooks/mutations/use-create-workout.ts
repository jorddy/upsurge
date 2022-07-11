import { QueryClient, useMutation } from "react-query";
import { mutate } from "@/utils/mutate";
import { WorkoutType } from "../queries/validators";
import { CreateWorkoutError, CreateWorkoutInput } from "./validators";

export const useCreateWorkout = (queryClient: QueryClient) =>
  useMutation<WorkoutType, CreateWorkoutError, CreateWorkoutInput>(
    data => mutate("/api/data/create-workout", data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["workouts"]);
        queryClient.invalidateQueries(["latest-workouts"]);
      }
    }
  );
