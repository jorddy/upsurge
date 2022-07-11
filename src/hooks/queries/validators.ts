import { z } from "zod";

export const setValidator = z.object({
  id: z.string(),
  createdAt: z.string().transform(data => new Date(data)),
  weight: z.number().nullable(),
  reps: z.number().nullable(),
  distance: z.number().nullable(),
  elevation: z.number().nullable()
});

export type SetType = z.infer<typeof setValidator>;

export const entryValidator = z.object({
  id: z.string(),
  createdAt: z.string().transform(data => new Date(data)),
  updatedAt: z.string().transform(data => new Date(data)),
  notes: z.string().optional(),
  sets: setValidator.array().optional(),
  exercise: z
    .object({
      name: z.string()
    })
    .optional(),
  _count: z
    .object({
      sets: z.number()
    })
    .optional()
});

export type EntryType = z.infer<typeof entryValidator>;

export const exerciseValidator = z.object({
  id: z.string(),
  createdAt: z.string().transform(data => new Date(data)),
  updatedAt: z.string().transform(data => new Date(data)),
  name: z.string(),
  currentWeight: z.number().nullable(),
  targetWeight: z.number().nullable(),
  currentDistance: z.number().nullable(),
  targetDistance: z.number().nullable(),
  entries: entryValidator.array().optional()
});

export type ExerciseType = z.infer<typeof exerciseValidator>;

export const workoutValidator = z.object({
  id: z.string(),
  createdAt: z.string().transform(data => new Date(data)),
  updatedAt: z.string().transform(data => new Date(data)),
  name: z.string(),
  currentWeight: z.number().optional(),
  targetWeight: z.number().optional(),
  currentDistance: z.number().optional(),
  targetDistance: z.number().optional(),
  entries: entryValidator.array().optional()
});

export type WorkoutType = z.infer<typeof workoutValidator>;

export const sumWorkoutValidator = z.object({
  _sum: z.object({
    weight: z.number().nullable(),
    distance: z.number().nullable()
  })
});

export type SumWorkoutType = z.infer<typeof sumWorkoutValidator>;
