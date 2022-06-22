import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "@/utils/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    const latestworkouts = await prisma.workout.findMany({
      take: 2,
      orderBy: { updatedAt: "desc" },
      where: { userId: session.user.id },
      include: {
        exercise: true
      }
    });

    res.status(200).json(latestworkouts);
  }
};

export default handler;
