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

const sumEntryTypeEnum = z.enum(["weight", "distance"]);

export const sumEntriesValidator = z.object({
  type: sumEntryTypeEnum,
  workoutId: z.string()
});

export const byIdValidator = z.object({
  id: z.string()
});

export type EntryType = z.infer<typeof entryValidator>;
export type ExerciseType = z.infer<typeof exerciseValidator>;
export type WorkoutType = z.infer<typeof workoutValidator>;
export type SumEntryTypeEnum = z.infer<typeof sumEntryTypeEnum>;

export type SumEntryError = z.inferFlattenedErrors<typeof sumEntriesValidator>;
export type ByIdError = z.inferFlattenedErrors<typeof byIdValidator>;
