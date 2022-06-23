import { useQuery } from "react-query";
import { workoutValidator } from "@/shared/workout-validator";

export const useGetAllWorkouts = () =>
  useQuery(["all-workouts"], async () => {
    const res = await fetch("/api/workouts/get-all").then(r => r.json());
    console.log(res);
    return workoutValidator.array().parse(res);
  });
