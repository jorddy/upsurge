import { z } from "zod";
import { useQuery } from "react-query";

const allWorkoutsValidator = z
  .object({
    id: z.string(),
    name: z.string()
  })
  .array();

export const useGetAllWorkouts = () =>
  useQuery(["all-workouts"], async () => {
    const res = await fetch("/api/workouts/get-all").then(r => r.json());
    console.log(res);

    return allWorkoutsValidator.parse(res);
  });
