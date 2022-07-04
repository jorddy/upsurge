import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "@/utils/db";

export default async function getLatestWorkouts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session) {
    const latestworkouts = await prisma.workout.findMany({
      take: 2,
      orderBy: { updatedAt: "desc" },
      where: { userId: session.user.id },
      include: {
        entries: {
          include: { sets: true }
        }
      }
    });

    res.status(200).json(latestworkouts);
  }
}