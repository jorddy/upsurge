import { QueryClient, useMutation } from "react-query";
import { mutate } from "@/utils/mutate";
import { EntryType } from "../queries/validators";
import { CreateEntryError, CreateEntryInput } from "./validators";

export const useCreateEntry = (queryClient: QueryClient) =>
  useMutation<EntryType, CreateEntryError, CreateEntryInput>(
    data => mutate("/api/data/create-entry", data),
    {
      onSuccess: () => queryClient.invalidateQueries(["exercises"])
    }
  );
