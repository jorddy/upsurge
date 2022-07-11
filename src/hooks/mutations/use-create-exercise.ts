import { QueryClient, useMutation } from "react-query";
import { mutate } from "@/utils/mutate";
import { ExerciseType } from "../queries/validators";
import { CreateExerciseError, CreateExerciseInput } from "./validators";

export const useCreateExercise = (queryClient: QueryClient) =>
  useMutation<ExerciseType, CreateExerciseError, CreateExerciseInput>(
    data => mutate("/api/data/create-exercise", data),
    {
      onSuccess: () => queryClient.invalidateQueries(["exercises"])
    }
  );
