import { z } from "zod";
import { exerciseValidator } from "./exercise-validator";

export const workoutValidator = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  userId: z.string(),
  exercise: exerciseValidator.array()
});

export type WorkoutType = z.infer<typeof workoutValidator>;
