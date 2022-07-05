import { z } from "zod";

export const setsValidator = z.object({
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
  sets: setsValidator.array()
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

const sumEntryTypeEnum = z.enum(["weight", "distance"]);

export type SumEntryTypeEnum = z.infer<typeof sumEntryTypeEnum>;

export const sumEntriesValidator = z.object({
  type: sumEntryTypeEnum,
  workoutId: z.string()
});
