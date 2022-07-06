import { useQuery } from "react-query";
import { workoutByIdValidator } from "./validators";

export const useWorkoutById = (id: string | undefined) =>
  useQuery(
    ["workout-by-id", id],
    async () => {
      const res = await fetch(`/api/workout/get-workout-by-id?id=${id}`);

      if (!res.ok) throw await res.json();

      return workoutByIdValidator.parse(await res.json());
    },
    {
      enabled: !!id
    }
  );
