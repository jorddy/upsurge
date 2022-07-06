import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ZodError } from "zod";
import { sumEntriesValidator } from "@/hooks/queries/validators";
import { prisma } from "@/utils/db";
import { cacheOneDay } from "@/utils/cache-one-day";

export default async function sumEntries(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session) {
    try {
      const { type, workoutId } = sumEntriesValidator.parse(req.query);

      if (type === "weight") {
        const totalWeight = await prisma.set.aggregate({
          _sum: { weight: true },
          where: { entry: { workoutId } }
        });

        res.setHeader("Cache-Control", cacheOneDay);
        res.status(200).json(totalWeight._sum.weight);
      }

      if (type === "distance") {
        const totalDistance = await prisma.set.aggregate({
          _sum: { distance: true },
          where: { entry: { workoutId } }
        });

        res.setHeader("Cache-Control", cacheOneDay);
        res.status(200).json(totalDistance._sum.distance);
      }
    } catch (error) {
      if (error instanceof ZodError) res.status(500).json(error.flatten());
    }
  }
}
