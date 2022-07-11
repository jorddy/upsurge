import { NextApiRequest, NextApiResponse } from "next";
import { authorize } from "@/utils/authorize";
import { createExerciseValidator } from "@/hooks/mutations/validators";
import { prisma } from "@/utils/db";
import { zodError } from "@/utils/zod-error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await authorize(req, res);

  if (session) {
    try {
      const input = createExerciseValidator.parse(req.body);

      const exercise = await prisma.exercise.create({
        data: {
          ...input,
          user: { connect: { id: session.user.id } }
        }
      });

      res.status(200).json(exercise);
    } catch (error) {
      zodError(error, res);
    }
  }
}
