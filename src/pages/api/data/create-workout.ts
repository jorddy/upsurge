import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { authorize } from "@/server/authorize";
import { createWorkout } from "@/server/data/create-workout";
import { createWorkoutValidator } from "@/shared/create-workout-validator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await authorize(req, res);

  if (session) {
    try {
      const input = createWorkoutValidator.parse(req.body);
      const entry = await createWorkout(input, session.user.id);

      res.status(200).json(entry);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(500).json(error.flatten());
      } else {
        res.status(500).json(error);
      }
    }
  }
}
