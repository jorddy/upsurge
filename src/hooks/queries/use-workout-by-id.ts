import { useQuery } from "react-query";
import { WorkoutById } from "@/pages/api/workout/get-workout-by-id";
import { IdErrors } from "@/utils/validators";

export const useWorkoutById = (id: string | undefined) =>
  useQuery<WorkoutById, IdErrors>(
    ["workout-by-id", id],
    async () => {
      const res = await fetch(`/api/workout/get-workout-by-id?id=${id}`);
      if (!res.ok) throw await res.json();

      return await res.json();
    },
    {
      enabled: !!id
    }
  );
