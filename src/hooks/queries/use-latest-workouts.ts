import { useQuery } from "react-query";
import { workoutValidator } from "./validators";

export const useLatestWorkouts = () =>
  useQuery(["latest-workouts"], async () => {
    const res = await (await fetch("/api/data/get-latest-workouts")).json();
    return workoutValidator.array().parse(res);
  });
