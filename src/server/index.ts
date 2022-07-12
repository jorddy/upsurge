import { createProtectedRouter } from "./context";
import superjson from "superjson";

export const appRouter = createProtectedRouter()
  .transformer(superjson)
  .query("hello", {
    resolve() {
      return "wad";
    }
  });

export type AppRouter = typeof appRouter;
