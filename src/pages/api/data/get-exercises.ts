import { NextApiRequest, NextApiResponse } from "next";
import { authorize } from "@/utils/authorize";
import { prisma } from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await authorize(req, res);

  if (session) {
    try {
      const exercises = await prisma.exercise.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: "desc" },
        include: {
          entries: {
            include: { sets: true }
          }
        }
      });

      res.status(200).json(exercises);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
