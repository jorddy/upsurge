import { useQuery } from "react-query";
import { SumEntries } from "@/pages/api/workout/sum-workout";
import { ByIdError } from "./validators";

export const useSumWorkout = (workoutId: string | undefined) =>
  useQuery<SumEntries, ByIdError>(
    ["sum-workout", workoutId],
    async () => {
      const res = await fetch(`/api/workout/sum-workout?id=${workoutId}`);
      if (!res.ok) throw await res.json();

      return await res.json();
    },
    {
      enabled: !!workoutId
    }
  );
