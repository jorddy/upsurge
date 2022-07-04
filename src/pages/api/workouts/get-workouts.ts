import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "@/utils/db";

export default async function getWorkouts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session) {
    const workouts = await prisma.workout.findMany({
      orderBy: { updatedAt: "desc" },
      where: { userId: session.user.id },
      include: {
        entries: {
          include: { sets: true }
        }
      }
    });

    res.status(200).json(workouts);
  }
}
