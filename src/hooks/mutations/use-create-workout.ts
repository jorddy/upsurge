import { QueryClient, useMutation } from "react-query";
import { WorkoutType } from "@/shared/workout-validator";
import {
  CreateWorkoutErrors,
  CreateWorkoutType
} from "@/shared/create-workout-validator";
import toast from "react-hot-toast";

export const useCreateWorkout = (queryClient: QueryClient) =>
  useMutation<WorkoutType, CreateWorkoutErrors, CreateWorkoutType>(
    async data => {
      const res = await fetch("/api/workouts/create", {
        method: "POST",
        body: JSON.stringify(data)
      });

      if (!res.ok) throw await res.json();
      return await res.json();
    },
    {
      onError: error => {
        toast.error(Object.values(error.fieldErrors).join(", "));
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["all-workouts"]);
      }
    }
  );
