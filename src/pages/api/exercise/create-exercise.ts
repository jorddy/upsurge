import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { unauthorized } from "@/utils/unauthorized";
import { Prisma } from "@prisma/client";
import { prisma } from "@/utils/db";
import { ZodError } from "zod";
import {
  CreateExerciseInput,
  createExerciseValidator
} from "@/hooks/mutations/validators";

const createExercise = (input: CreateExerciseInput, id: string) =>
  prisma.exercise.create({
    data: {
      ...input,
      user: { connect: { id } }
    }
  });

export type CreateExercise = Prisma.PromiseReturnType<typeof createExercise>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return unauthorized(res);

  try {
    const input = await createExerciseValidator.parse(req.body);
    const exercise = await createExercise(input, session.user.id);

    res.status(200).json(exercise);
  } catch (error) {
    if (error instanceof ZodError) res.status(500).json(error.flatten());
  }
}
