import { useQuery } from "react-query";
import { workoutValidator } from "./validators";

export const useWorkoutById = (id: string | undefined) =>
  useQuery(
    ["workout-by-id", id],
    async () => {
      const res = await (
        await fetch(`/api/data/get-workout-by-id?id=${id}`)
      ).json();

      return workoutValidator.parse(res);
    },
    {
      enabled: !!id
    }
  );
