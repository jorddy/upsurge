import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { prisma } from "@/utils/db";
import { getSession } from "next-auth/react";

const getWorkouts = (userId: string) =>
  prisma.workout.findMany({
    orderBy: { createdAt: "desc" },
    where: { userId },
    include: {
      exercise: { include: { entries: { include: { sets: true } } } }
    }
  });

export type GetWorkouts = Awaited<ReturnType<typeof getWorkouts>>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    try {
      const workouts = await getWorkouts(session.user.id);
      res.status(200).json(workouts);
    } catch (error) {
      if (error instanceof ZodError) res.status(500).json(error);
    }
  }
};

export default handler;
