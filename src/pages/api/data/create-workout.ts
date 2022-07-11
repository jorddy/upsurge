import { NextApiRequest, NextApiResponse } from "next";
import { authorize } from "@/utils/authorize";
import { createWorkoutValidator } from "@/hooks/mutations/validators";
import { prisma } from "@/utils/db";
import { zodError } from "@/utils/zod-error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await authorize(req, res);

  if (session) {
    try {
      const input = createWorkoutValidator.parse(req.body);

      const entry = await prisma.workout.create({
        data: {
          name: input.name,
          createdAt: input.createdAt,
          user: { connect: { id: session.user.id } },
          entries: {
            create: input.entries.map(entry => ({
              createdAt: input.createdAt,
              sets: {
                createMany: {
                  data: entry.sets.map(set => ({
                    ...set,
                    createdAt: input.createdAt
                  }))
                }
              },
              notes: entry.notes,
              exercise: { connect: { id: entry.exerciseId } }
            }))
          }
        }
      });

      res.status(200).json(entry);
    } catch (error) {
      zodError(error, res);
    }
  }
}
