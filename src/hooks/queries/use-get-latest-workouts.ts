import { useQuery } from "react-query";
import { workoutValidator } from "./validators";

export const useGetLatestWorkouts = () =>
  useQuery(["latest-workouts"], async () => {
    const res = await (await fetch("/api/workout/get-latest-workouts")).json();
    return workoutValidator.array().parse(res);
  });
