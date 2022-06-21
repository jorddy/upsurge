import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { prisma } from "@/utils/db";
import { getSession } from "next-auth/react";

const getLatestWorkouts = (userId: string) =>
  prisma.workout.findMany({
    take: 2,
    orderBy: { updatedAt: "desc" },
    where: { userId },
    include: {
      exercise: true
    }
  });

export type GetLatestWorkouts = Awaited<ReturnType<typeof getLatestWorkouts>>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    try {
      const Latestworkouts = await getLatestWorkouts(session.user.id);
      res.status(200).json(Latestworkouts);
    } catch (error) {
      if (error instanceof ZodError) res.status(500).json(error);
    }
  }
};

export default handler;
