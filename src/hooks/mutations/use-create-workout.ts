import { QueryClient, useMutation } from "react-query";
import { CreateWorkout } from "@/pages/api/workout/create-workout";
import { CreateWorkoutErrors, CreateWorkoutInput } from "@/utils/validators";
import toast from "react-hot-toast";

export const useCreateWorkout = (queryClient: QueryClient) =>
  useMutation<CreateWorkout, CreateWorkoutErrors, CreateWorkoutInput>(
    async data => {
      const res = await fetch("/api/workout/create-workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw await res.json();
      return await res.json();
    },
    {
      onMutate: () => toast.loading("Creating entry..."),
      onSuccess: () => {
        queryClient.invalidateQueries(["workouts"]);
        queryClient.invalidateQueries(["latest-workouts"]);
        toast.success("Successfully logged workout");
      }
    }
  );
