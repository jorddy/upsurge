import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "./db";

export const createContext = async ({
  req,
  res
}: trpcNext.CreateNextContextOptions) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  return { session, prisma };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createProtectedRouter = () =>
  trpc.router<Context>().middleware(({ ctx, next }) => {
    if (!ctx.session) {
      throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
    }

    return next({
      ctx: {
        ...ctx,
        // infers that `user` is non-nullable to downstream procedures
        user: ctx.session.user
      }
    });
  });
