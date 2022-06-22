import { z } from "zod";
import { useQuery } from "react-query";

const latestWorkoutsValidator = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  userId: z.string(),
  exercise: z
    .object({
      id: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      name: z.string(),
      description: z.string(),
      currentWeight: z.number(),
      targetWeight: z.number(),
      userId: z.string(),
      workoutId: z.string()
    })
    .array()
});

export type LatestWorkoutType = z.infer<typeof latestWorkoutsValidator>;

export const useGetLatestWorkouts = () =>
  useQuery(["latest-workouts"], async () => {
    const res = await fetch("/api/workouts/get-latest").then(r => r.json());
    console.log(res);

    return latestWorkoutsValidator.array().parse(res);
  });
