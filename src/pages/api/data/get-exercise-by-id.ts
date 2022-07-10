import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { authorize } from "@/server/authorize";
import { idValidator } from "@/shared/id-validator";
import { getExerciseById } from "@/server/data/get-exercise-by-id";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await authorize(req, res);

  try {
    const input = idValidator.parse(req.query);
    const exercise = await getExerciseById(input);

    res.status(200).json(exercise);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(500).json(error.flatten());
    } else {
      res.status(500).json(error);
    }
  }
}
