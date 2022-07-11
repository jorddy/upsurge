import { QueryClient, useMutation } from "react-query";
import { mutate } from "@/utils/mutate";
import { EntryType } from "../queries/validators";
import { IdError, IdInput } from "./validators";

export const useDeleteEntry = (
  queryClient: QueryClient,
  page: "workout" | "exercise",
  id: string
) =>
  useMutation<EntryType, IdError, IdInput>(
    data => mutate("/api/data/delete-entry", data),
    {
      onSuccess: () => {
        if (page === "exercise") {
          queryClient.invalidateQueries(["exercise-by-id", id]);
        }

        if (page === "workout") {
          queryClient.invalidateQueries(["workout-by-id", id]);
        }
      }
    }
  );
