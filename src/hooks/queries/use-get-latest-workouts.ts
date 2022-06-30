import { useQuery } from "react-query";
import { workoutValidator } from "./validators";

export const useGetLatestWorkouts = () =>
  useQuery(["latest-workouts"], async () => {
    const res = await (await fetch("/api/workouts/get-latest")).json();
    return workoutValidator.array().parse(res);
  });
