import { NextApiResponse } from "next";
import { ZodError } from "zod";

export const zodError = (error: unknown, res: NextApiResponse) => {
  if (error instanceof ZodError) {
    res.status(400).json(error.flatten());
  } else {
    res.status(400).json(error);
  }
};
