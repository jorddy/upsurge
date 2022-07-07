import { NextApiResponse } from "next";

export const unauthorized = (res: NextApiResponse) => {
  res.status(401).json({ message: "You are not authorized to do that!" });
  return;
};
