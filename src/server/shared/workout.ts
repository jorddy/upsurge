import { z } from "zod";
import { entryValidator } from "./entry";

export const workoutValidator = z.object({
  name: z.string().min(1, "You must provide a name"),
  createdAt: z
    .string()
    .min(1, "You must provide a date")
    .transform(data => new Date(data))
    .or(z.date()),
  entries: entryValidator
    .extend({
      name: z.string(),
      type: z.enum(["weight", "cardio"])
    })
    .array()
});

export type WorkoutValidator = z.infer<typeof workoutValidator>;
