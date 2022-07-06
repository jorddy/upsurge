import { useQuery } from "react-query";
import { workoutValidator } from "./validators";

export const useWorkoutById = (id: string) =>
  useQuery(
    ["workout-by-id", id],
    async () => {
      const res = await fetch(`/api/workout/get-workout-by-id?id=${id}`);

      if (!res.ok) throw await res.json();

      return workoutValidator.parse(await res.json());
    },
    {
      enabled: !!id
    }
  );
