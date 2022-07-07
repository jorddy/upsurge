import superjson from "superjson";
import { createProtectedRouter } from "./context";
import { exerciseRouter } from "./routers/exercise-router";

export const appRouter = createProtectedRouter()
  .transformer(superjson)
  .merge("exercise.", exerciseRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
