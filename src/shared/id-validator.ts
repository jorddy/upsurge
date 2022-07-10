import { z } from "zod";

export const idValidator = z.object({
  id: z.string()
});

export type IdInput = z.infer<typeof idValidator>;
export type IdErrors = z.inferFlattenedErrors<typeof idValidator>;
