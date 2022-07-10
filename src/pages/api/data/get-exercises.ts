import { NextApiRequest, NextApiResponse } from "next";
import { authorize } from "@/server/authorize";
import { getExercises } from "@/server/data/get-exercises";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await authorize(req, res);

  if (session) {
    try {
      const exercises = await getExercises(session.user.id);
      res.status(200).json(exercises);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
