import { z } from "zod";
import { useQuery } from "react-query";

const latestWorkoutsValidator = z
  .object({
    id: z.string(),
    name: z.string()
  })
  .array();

export const useGetLatestWorkouts = () =>
  useQuery(["latest-workouts"], async () => {
    const res = await fetch("/api/workouts/get-latest").then(r => r.json());
    console.log(res);

    return latestWorkoutsValidator.parse(res);
  });
