import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "@/utils/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    const workouts = await prisma.workout.findMany({
      orderBy: { createdAt: "desc" },
      where: { userId: session.user.id },
      include: {
        exercise: {
          include: {
            entries: {
              include: { sets: true }
            }
          }
        }
      }
    });

    res.status(200).json(workouts);
  }
};

export default handler;
