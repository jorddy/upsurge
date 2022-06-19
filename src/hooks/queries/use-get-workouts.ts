import { useQuery } from "react-query";
import { ZodError } from "zod";
import { GetWorkouts } from "@/pages/api/workout/get-workouts";

export const getWorkouts = async () => {
  const res = await fetch("/api/workout/get");

  if (!res.ok) throw new ZodError(await res.json());
  return res.json();
};

export const useGetWorkouts = () =>
  useQuery<GetWorkouts, ZodError>(["get-workouts", getWorkouts]);
