import { QueryClient, useMutation } from "react-query";
import { fetcher } from "@/server/fetcher";
import { CreateEntry } from "@/server/data/create-entry";
import {
  CreateEntryErrors,
  CreateEntryInput
} from "@/shared/create-entry-validator";
import toast from "react-hot-toast";

let toastId: string;

export const useCreateEntry = (queryClient: QueryClient) =>
  useMutation<CreateEntry, CreateEntryErrors, CreateEntryInput>(
    data => fetcher("/api/data/create-entry", true, data),
    {
      onSuccess: () => queryClient.invalidateQueries(["exercises"])
    }
  );
