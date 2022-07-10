import { useQuery } from "react-query";
import { fetcher } from "@/server/fetcher";
import { LatestWorkouts } from "@/server/data/get-latest-workouts";

export const useLatestWorkouts = () =>
  useQuery<LatestWorkouts>(["latest-workouts"], () =>
    fetcher("/api/data/get-latest-workouts")
  );
