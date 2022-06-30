import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ZodError } from "zod";
import { prisma } from "@/utils/db";
import { createExerciseValidator } from "@/hooks/mutations/validators";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    try {
      const input = createExerciseValidator.parse(JSON.parse(req.body));
      const exercise = await prisma.exercise.create({
        data: {
          ...input,
          user: { connect: { id: session.user.id } }
        }
      });

      res.status(200).json(exercise);
    } catch (error) {
      if (error instanceof ZodError) res.status(500).json(error.flatten());
    }
  }
};

export default handler;
