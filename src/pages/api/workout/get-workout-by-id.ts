import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ZodError } from "zod";
import { byIdValidator } from "@/hooks/queries/validators";
import { prisma } from "@/utils/db";

export default async function getExerciseById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session) {
    try {
      const { id } = byIdValidator.parse(req.query);

      const exercise = await prisma.workout.findUnique({
        where: { id },
        include: {
          entries: {
            include: { exercise: true, sets: true }
          }
        }
      });

      res.status(200).json(exercise);
    } catch (error) {
      if (error instanceof ZodError) res.status(500).json(error.flatten());
    }
  }
}
