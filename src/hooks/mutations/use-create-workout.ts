import { QueryClient, useMutation } from "react-query";
import { CreateExercise } from "@/pages/api/exercise/create-exercise";
import { CreateExerciseErrors, CreateExerciseInput } from "@/utils/validators";
import toast from "react-hot-toast";

export const useCreateExercise = (queryClient: QueryClient) =>
  useMutation<CreateExercise, CreateExerciseErrors, CreateExerciseInput>(
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
