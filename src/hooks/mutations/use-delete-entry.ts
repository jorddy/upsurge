import { QueryClient, useMutation } from "react-query";
import { fetcher } from "@/server/fetcher";
import { DeleteEntry } from "@/server/data/delete-entry";
import { IdErrors, IdInput } from "@/shared/id-validator";

export const useDeleteEntry = (
  queryClient: QueryClient,
  page: "workout" | "exercise",
  id: string
) =>
  useMutation<DeleteEntry, IdErrors, IdInput>(
    data => fetcher("/api/data/delete-entry", true, data),
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
