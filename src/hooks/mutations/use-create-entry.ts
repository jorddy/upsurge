import { QueryClient, useMutation } from "react-query";
import { CreateEntry } from "@/pages/api/entry/create-entry";
import { CreateEntryErrors, CreateEntryInput } from "./validators";
import toast from "react-hot-toast";

export const useCreateEntry = (queryClient: QueryClient) =>
  useMutation<CreateEntry, CreateEntryErrors, CreateEntryInput>(
    async data => {
      const res = await fetch("/api/entry/create-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw await res.json();

      return await res.json();
    },
    {
      onMutate: () => toast.loading("Creating entry..."),
      onSuccess: () => queryClient.invalidateQueries(["exercises"])
    }
  );
