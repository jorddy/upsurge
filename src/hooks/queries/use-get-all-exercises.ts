import { useQuery } from "react-query";
import { exerciseValidator } from "@/shared/exercise-validator";

export const useGetAllExercises = () =>
  useQuery(["all-exercises"], async () => {
    const res = await fetch("/api/exercises/get-all").then(r => r.json());
    return exerciseValidator.array().parse(res);
  });
