import { useQuery } from "react-query";
import { exerciseValidator } from "./validators";

export const useExercises = () =>
  useQuery(["exercises"], async () => {
    const res = await (await fetch("/api/exercise/get-exercises")).json();
    return exerciseValidator.array().parse(res);
  });
