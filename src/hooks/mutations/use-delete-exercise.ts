import { QueryClient, useMutation } from "react-query";
import { fetcher } from "@/server/fetcher";
import { DeleteExercise } from "@/server/data/delete-exercise";
import { IdErrors, IdInput } from "@/shared/id-validator";

export const useDeleteExercise = (queryClient: QueryClient) =>
  useMutation<DeleteExercise, IdErrors, IdInput>(
    data => fetcher("/api/data/delete-exercise", true, data),
    {
      onSuccess: () => queryClient.invalidateQueries(["exercises"])
    }
  );
