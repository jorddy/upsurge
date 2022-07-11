import { QueryClient, useMutation } from "react-query";
import { mutate } from "@/utils/mutate";
import { ExerciseType } from "../queries/validators";
import { IdError, IdInput } from "./validators";

export const useDeleteExercise = (queryClient: QueryClient) =>
  useMutation<ExerciseType, IdError, IdInput>(
    data => mutate("/api/data/delete-exercise", data),
    {
      onSuccess: () => queryClient.invalidateQueries(["exercises"])
    }
  );
