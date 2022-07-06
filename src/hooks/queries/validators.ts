import { z } from "zod";

export const setValidator = z.object({
  id: z.string(),
  createdAt: z.string().transform(data => new Date(data)),
  reps: z.number().nullable(),
  weight: z.number().nullable(),
  distance: z.number().nullable(),
  elevation: z.number().nullable()
});

export const entryValidator = z.object({
  id: z.string(),
  createdAt: z.string().transform(data => new Date(data)),
  updatedAt: z.string().transform(data => new Date(data)),
  notes: z.string().nullable(),
  sets: setValidator.array()
});

export const exerciseValidator = z.object({
  id: z.string(),
  createdAt: z.string().transform(data => new Date(data)),
  updatedAt: z.string().transform(data => new Date(data)),
  name: z.string(),
  currentWeight: z.number().nullable(),
  targetWeight: z.number().nullable(),
  currentDistance: z.number().nullable(),
  targetDistance: z.number().nullable(),
  entries: entryValidator.array()
});

export const workoutValidator = z.object({
  id: z.string(),
  createdAt: z.string().transform(data => new Date(data)),
  updatedAt: z.string().transform(data => new Date(data)),
  name: z.string(),
  entries: entryValidator.array()
});

export const workoutByIdValidator = workoutValidator.extend({
  entries: entryValidator
    .extend({
      exercise: exerciseValidator.extend({
        entries: entryValidator.optional()
      })
    })
    .array()
});

export const sumEntriesValidator = z.object({
  weight: z.number().nullable(),
  distance: z.number().nullable()
});

export const byIdValidator = z.object({
  id: z.string()
});

export type ExerciseType = z.infer<typeof exerciseValidator>;
export type WorkoutType = z.infer<typeof workoutValidator>;
export type WorkoutByIdType = z.infer<typeof workoutByIdValidator>;
export type EntryType = z.infer<typeof entryValidator>;
