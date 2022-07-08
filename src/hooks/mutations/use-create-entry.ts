import { QueryClient, useMutation } from "react-query";
import { CreateEntry } from "@/pages/api/entry/create-entry";
import { CreateEntryErrors, CreateEntryInput } from "./validators";
import toast from "react-hot-toast";

let toastId: string;

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
