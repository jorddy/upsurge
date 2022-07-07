import { z } from "zod";

export const byIdValidator = z.object({
  id: z.string()
});

export type ByIdError = z.infer<typeof byIdValidator>;
