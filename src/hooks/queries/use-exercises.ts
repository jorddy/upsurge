import { useQuery } from "react-query";
import { fetcher } from "@/server/fetcher";
import { Exercises } from "@/server/data/get-exercises";

export const useExercises = () =>
  useQuery<Exercises>(["exercises"], () => fetcher("/api/data/get-exercises"));
