import { NextApiRequest, NextApiResponse } from "next";
import { authorize } from "@/server/authorize";
import { ZodError } from "zod";
import { idValidator } from "@/shared/id-validator";
import { getWorkoutById } from "@/server/data/get-workout-by-id";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await authorize(req, res);

  try {
    const input = idValidator.parse(req.query);
    const workout = await getWorkoutById(input);

    res.status(200).json(workout);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(500).json(error.flatten());
    } else {
      res.status(500).json(error);
    }
  }
}
