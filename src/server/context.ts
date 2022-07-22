import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "./db";
import { getUpsurgeAuth } from "./auth";

export const createContext = async (ctx: trpcNext.CreateNextContextOptions) => {
  const session = await getUpsurgeAuth(ctx);
  return { session, prisma };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = trpc.router<Context>;

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
