import { useQuery } from "react-query";
import { workoutValidator } from "./validators";

export const useGetAllWorkouts = () =>
  useQuery(["all-workouts"], async () => {
    const res = await (await fetch("/api/workouts/get-all")).json();
    return workoutValidator.array().parse(res);
  });
