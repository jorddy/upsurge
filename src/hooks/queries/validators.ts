import { z } from "zod";

export const exerciseValidator = z.object({
  id: z.string(),
  createdAt: z.string().transform(data => new Date(data)),
  updatedAt: z.string().transform(data => new Date(data)),
  name: z.string(),
  description: z.string(),
  currentWeight: z.number(),
  targetWeight: z.number(),
  userId: z.string(),
  workoutId: z.string().nullish()
});

export type ExerciseType = z.infer<typeof exerciseValidator>;

export const workoutValidator = z.object({
  id: z.string(),
  createdAt: z.string().transform(data => new Date(data)),
  updatedAt: z.string().transform(data => new Date(data)),
  name: z.string(),
  userId: z.string(),
  exercise: exerciseValidator.array()
});

export type WorkoutType = z.infer<typeof workoutValidator>;
