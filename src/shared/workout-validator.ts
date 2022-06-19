import { z } from "zod";

export const workoutValidator = z.object({
  user:
});

export type WorkoutValidator = z.infer<typeof workoutValidator>