import { useQuery } from "react-query";
import { exerciseValidator } from "./validators";

export const useGetAllExercises = () =>
  useQuery(["all-exercises"], async () => {
    const res = await (await fetch("/api/exercises/get-all")).json();
    return exerciseValidator.array().parse(res);
  });
