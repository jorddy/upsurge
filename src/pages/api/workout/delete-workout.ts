import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { prisma } from "@/utils/db";
import { workoutValidator, WorkoutValidator } from "@/shared/workout-validator";
import { getSession } from "next-auth/react";

const deleteWorkout = (input: WorkoutValidator) =>
  prisma.workout.delete({
    where: { id: input.id }
  });

export type DeleteWorkout = Awaited<ReturnType<typeof deleteWorkout>>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    try {
      const input = workoutValidator.parse(JSON.parse(req.body));
      const data = deleteWorkout(input);

      res.status(200).json(data);
    } catch (error) {
      if (error instanceof ZodError) res.status(500).json(error.flatten());
    }
  }
};

export default handler;
