import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ZodError } from "zod";
import { byIdValidator } from "@/hooks/queries/validators";
import { prisma } from "@/utils/db";
import { cacheOneDay } from "@/utils/cache-one-day";

export default async function sumEntries(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session) {
    try {
      const { id } = byIdValidator.parse(req.query);

      const total = await prisma.set.aggregate({
        _sum: { weight: true, distance: true },
        where: { entry: { workoutId: id } }
      });

      res.setHeader("Cache-Control", cacheOneDay);
      res.status(200).json(total._sum);
    } catch (error) {
      if (error instanceof ZodError) res.status(500).json(error.flatten());
    }
  }
}
