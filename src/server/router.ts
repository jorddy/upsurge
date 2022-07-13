import superjson from "superjson";
import { createRouter } from "./context";
import { workoutRouter } from "./routers/workout-router";
import { exerciseRouter } from "./routers/exercise-router";
import { entryRouter } from "./routers/entry-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("workout.", workoutRouter)
  .merge("exercise.", exerciseRouter)
  .merge("entry.", entryRouter);

export type AppRouter = typeof appRouter;
