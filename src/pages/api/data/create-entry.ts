import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { authorize } from "@/server/authorize";
import { createEntry } from "@/server/data/create-entry";
import { createEntryValidator } from "@/shared/create-entry-validator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await authorize(req, res);

  try {
    const input = createEntryValidator.parse(req.body);
    const entry = await createEntry(input);

    res.status(200).json(entry);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(500).json(error.flatten());
    } else {
      res.status(500).json(error);
    }
  }
}
