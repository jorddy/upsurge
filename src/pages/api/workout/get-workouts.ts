import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { unauthorized } from "@/utils/unauthorized";
import { Prisma } from "@prisma/client";
import { prisma } from "@/utils/db";

const getWorkouts = (userId: string) =>
  prisma.workout.findMany({
    orderBy: { updatedAt: "desc" },
    where: { userId },
    include: {
      entries: {
        include: { sets: true }
      }
    }
  });

export type Workouts = Prisma.PromiseReturnType<typeof getWorkouts>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return unauthorized(res);

  res.status(200).json(await getWorkouts(session.user.id));
}
