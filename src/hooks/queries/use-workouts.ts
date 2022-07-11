import { useQuery } from "react-query";
import { workoutValidator } from "./validators";

export const useWorkouts = () =>
  useQuery(["workouts"], async () => {
    const res = await (await fetch("/api/data/get-workouts")).json();
    return workoutValidator.array().parse(res);
  });
