import { z } from "zod";

export const setsValidator = z.object({
  id: z.string(),
  createdAt: z.string().transform(data => new Date(data)),
  updatedAt: z.string().transform(data => new Date(data)),
  notes: z.string(),
  reps: z.number().optional(),
  weight: z.number().optional(),
  distance: z.number().optional(),
  elevation: z.number().optional()
});

export const entryValidator = z.object({
  id: z.string(),
  createdAt: z.string().transform(data => new Date(data)),
  updatedAt: z.string().transform(data => new Date(data)),
  notes: z.string(),
  sets: setsValidator.array()
});

export const exerciseValidator = z.object({
  id: z.string(),
  createdAt: z.string().transform(data => new Date(data)),
  updatedAt: z.string().transform(data => new Date(data)),
  name: z.string(),
  description: z.string(),
  currentWeight: z.number().optional(),
  targetWeight: z.number().optional(),
  currentDistance: z.number().optional(),
  targetDistance: z.number().optional(),
  entries: entryValidator.array()
});

export type ExerciseType = z.infer<typeof exerciseValidator>;

export const workoutValidator = z.object({
  id: z.string(),
  createdAt: z.string().transform(data => new Date(data)),
  updatedAt: z.string().transform(data => new Date(data)),
  name: z.string(),
  entries: entryValidator.array()
});

export type WorkoutType = z.infer<typeof workoutValidator>;
