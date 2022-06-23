import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "@/utils/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    const exercises = await prisma.exercise.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      include: { entries: { include: { sets: true } } }
    });

    res.status(200).json(exercises);
  }
};

export default handler;
