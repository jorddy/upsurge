import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { unauthorized } from "@/utils/unauthorized";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/utils/db";
import { byIdValidator } from "@/hooks/queries/validators";

const getExerciseById = (id: string) =>
  prisma.exercise.findUnique({
    where: { id },
    include: {
      entries: {
        include: { sets: true }
      }
    }
  });

export type ExerciseById = Prisma.PromiseReturnType<typeof getExerciseById>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return unauthorized(res);

  try {
    const { id } = byIdValidator.parse(req.query);
    res.status(200).json(await getExerciseById(id));
  } catch (error) {
    if (error instanceof ZodError) res.status(500).json(error.flatten());
  }
}
