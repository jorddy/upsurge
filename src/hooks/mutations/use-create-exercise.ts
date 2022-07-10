import { QueryClient, useMutation } from "react-query";
import { fetcher } from "@/server/fetcher";
import { CreateExercise } from "@/server/data/create-exercise";
import {
  CreateExerciseErrors,
  CreateExerciseInput
} from "@/shared/create-exercise-validator";

export const useCreateExercise = (queryClient: QueryClient) =>
  useMutation<CreateExercise, CreateExerciseErrors, CreateExerciseInput>(
    data => fetcher("/api/data/create-exercise", true, data),
    {
      onSuccess: () => queryClient.invalidateQueries(["exercises"])
    }
  );
