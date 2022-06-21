import { useQuery } from "react-query";
import { ZodError } from "zod";
import { GetLatestWorkouts } from "@/pages/api/workout/get-latest-workouts";

export const getLatestWorkouts = async () => {
  const res = await fetch("/api/workout/get-latest-workouts");

  if (!res.ok) throw new ZodError(await res.json());
  return res.json();
};

export const useGetLatestWorkouts = () =>
  useQuery<GetLatestWorkouts, ZodError>(
    ["get-latest-workouts"],
    getLatestWorkouts
  );
