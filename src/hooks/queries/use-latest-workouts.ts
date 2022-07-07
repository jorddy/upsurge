import { useQuery } from "react-query";
import { LatestWorkouts } from "@/pages/api/workout/get-latest-workouts";

export const useLatestWorkouts = () =>
  useQuery<LatestWorkouts>(["latest-workouts"], () =>
    fetch("/api/workout/get-latest-workouts").then(r => r.json())
  );
