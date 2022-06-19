import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { prisma } from "@/utils/db";

const getWorkouts = () =>
  prisma.workout.findMany({
    orderBy: { createdAt: "desc" }
  });

export type GetWorkouts = Awaited<ReturnType<typeof getWorkouts>>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json(getWorkouts);
  } catch (error) {
    if (error instanceof ZodError) res.status(500).json(error);
  }
};

export default handler;
