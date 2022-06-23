import { useQuery } from "react-query";
import { z } from "zod";

const allExercisesValidator = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  currentWeight: z.number(),
  targetWeight: z.number()
});

export const useGetAllExercises = () =>
  useQuery(["all-exercises"], async () => {
    const res = await fetch("/api/exercises/get-all").then(r => r.json());
    return allExercisesValidator.array().parse(res);
  });
