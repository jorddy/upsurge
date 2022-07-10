import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { authorize } from "@/server/authorize";
import { createExercise } from "@/server/data/create-exercise";
import { createExerciseValidator } from "@/shared/create-exercise-validator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await authorize(req, res);

  if (session) {
    try {
      const input = createExerciseValidator.parse(req.body);
      const exercise = await createExercise(input, session.user.id);

      res.status(200).json(exercise);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(500).json(error.flatten());
      } else {
        res.status(500).json(error);
      }
    }
  }
}
