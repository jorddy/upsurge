import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { unauthorized } from "@/utils/unauthorized";
import { ZodError } from "zod";
import { prisma } from "@/utils/db";
import { Prisma } from "@prisma/client";
import { byIdValidator } from "@/hooks/queries/validators";

const getWorkoutById = (id: string) =>
  prisma.workout.findUnique({
    where: { id },
    include: {
      entries: {
        include: { exercise: true, sets: true }
      }
    }
  });

export type WorkoutById = Prisma.PromiseReturnType<typeof getWorkoutById>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return unauthorized(res);

  try {
    const { id } = byIdValidator.parse(req.query);
    res.status(200).json(await getWorkoutById(id));
  } catch (error) {
    if (error instanceof ZodError) res.status(500).json(error.flatten());
  }
}
