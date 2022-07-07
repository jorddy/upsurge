import { useQuery } from "react-query";
import { Exercises } from "@/pages/api/exercise/get-exercises";

export const useExercises = () =>
  useQuery<Exercises>(["exercises"], () =>
    fetch("/api/exercise/get-exercises").then(r => r.json())
  );
