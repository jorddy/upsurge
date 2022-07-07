import { useQuery } from "react-query";
import { Workouts } from "@/pages/api/workout/get-workouts";

export const useWorkouts = () =>
  useQuery<Workouts>(["workouts"], () =>
    fetch("/api/workout/get-workouts").then(r => r.json())
  );
