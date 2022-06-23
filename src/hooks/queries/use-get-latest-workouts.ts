import { useQuery } from "react-query";
import { workoutValidator } from "@/shared/workout-validator";

export const useGetLatestWorkouts = () =>
  useQuery(["latest-workouts"], async () => {
    const res = await fetch("/api/workouts/get-latest").then(r => r.json());
    return workoutValidator.array().parse(res);
  });
