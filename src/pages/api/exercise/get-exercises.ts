import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Prisma } from "@prisma/client";
import { prisma } from "@/utils/db";
import { unauthorized } from "@/utils/unauthorized";

const getExercises = (userId: string) =>
  prisma.exercise.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    include: {
      entries: {
        include: { sets: true }
      }
    }
  });

export type Exercises = Prisma.PromiseReturnType<typeof getExercises>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return unauthorized(res);

  try {
    res.status(200).json(await getExercises(session.user.id));
  } catch (error) {
    throw error;
  }
}
