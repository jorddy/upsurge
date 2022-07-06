import { z } from "zod";

export const createWorkoutValidator = z.object({
  name: z.string().min(1, "You must provide a name"),
  exercises: z.string().array()
});
