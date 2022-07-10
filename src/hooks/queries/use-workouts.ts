import { useQuery } from "react-query";
import { fetcher } from "@/server/fetcher";
import { Workouts } from "@/server/data/get-workouts";

export const useWorkouts = () =>
  useQuery<Workouts>(["workouts"], () => fetcher("/api/data/get-workouts"));
