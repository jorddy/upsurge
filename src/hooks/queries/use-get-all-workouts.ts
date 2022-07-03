import { useQuery } from "react-query";
import { workoutValidator } from "./validators";

export const useGetAllWorkouts = () =>
  useQuery(["workouts"], async () => {
    const res = await (await fetch("/api/workouts/get")).json();
    return workoutValidator.array().parse(res);
  });
