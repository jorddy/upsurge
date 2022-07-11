import { useQuery } from "react-query";
import { sumWorkoutValidator } from "./validators";

export const useSumWorkout = (workoutId: string | undefined) =>
  useQuery(
    ["sum-workout", workoutId],
    async () => {
      const res = await (
        await fetch(`/api/data/sum-workout?id=${workoutId}`)
      ).json();

      return sumWorkoutValidator.parse(res);
    },
    {
      enabled: !!workoutId
    }
  );
