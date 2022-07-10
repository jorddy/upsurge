import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { authorize } from "@/server/authorize";
import { idValidator } from "@/shared/id-validator";
import { deleteExercise } from "@/server/data/delete-exercise";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await authorize(req, res);

  try {
    const input = idValidator.parse(req.body);
    const exercise = await deleteExercise(input);

    res.status(200).json(exercise);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(500).json(error.flatten());
    } else {
      res.status(500).json(error);
    }
  }
}
