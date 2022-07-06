import { useQuery } from "react-query";
import { sumEntriesValidator } from "./validators";

export const useSumWorkout = (workoutId: string) =>
  useQuery(
    ["sum-workout", workoutId],
    async () => {
      const res = await fetch(`/api/workout/sum-workout?id=${workoutId}`);

      if (!res.ok) throw await res.json();

      return sumEntriesValidator.parse(await res.json());
    },
    {
      enabled: !!workoutId
    }
  );
