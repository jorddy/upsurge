import { useQuery } from "react-query";
import { WorkoutById } from "@/pages/api/workout/get-workout-by-id";
import { ByIdError } from "./validators";

export const useWorkoutById = (id: string | undefined) =>
  useQuery<WorkoutById, ByIdError>(
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
