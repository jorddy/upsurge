import { useQuery } from "react-query";
import { workoutValidator } from "./validators";

export const useGetAllWorkouts = () =>
  useQuery(["all-workouts"], async () => {
    const res = await fetch("/api/workouts/get-all").then(r => r.json());
    return workoutValidator.array().parse(res);
  });
