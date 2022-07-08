import { QueryClient, useMutation } from "react-query";
import { CreateExercise } from "@/pages/api/exercise/create-exercise";
import { CreateExerciseErrors, CreateExerciseInput } from "./validators";
import toast from "react-hot-toast";

let toastId: string;

export const useCreateExercise = (queryClient: QueryClient) =>
  useMutation<CreateExercise, CreateExerciseErrors, CreateExerciseInput>(
    async data => {
      const res = await fetch("/api/exercise/create-exercise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw await res.json();

      return await res.json();
    },
    {
      onMutate: () => {
        toastId = toast.loading("Creating entry...");
      },
      onError: error => {
        toast.error(`❌ Something went wrong, ${error}`, { id: toastId });
      },
      onSuccess: () => {
        toast.success("✅ Successfully logged entry", { id: toastId });
        queryClient.invalidateQueries(["exercises"]);
      }
    }
  );
