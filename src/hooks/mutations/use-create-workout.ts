import toast from "react-hot-toast";
import { QueryClient, useMutation } from "react-query";
import { WorkoutType } from "../queries/validators";
import { CreateWorkoutErrors, CreateWorkoutType } from "./validators";

export const useCreateWorkout = (queryClient: QueryClient) =>
  useMutation<WorkoutType, CreateWorkoutErrors, CreateWorkoutType>(
    async data => {
      const res = await fetch("/api/workouts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw await res.json();
      return await res.json();
    },
    {
      onMutate: () => {
        toast.loading("Creating workout...");
      },
      onError: error => {
        toast.dismiss();
        toast.error(Object.values(error.fieldErrors).join(", "));
      },
      onSuccess: () => {
        toast.dismiss();
        queryClient.invalidateQueries(["all-workouts"]);
      }
    }
  );
