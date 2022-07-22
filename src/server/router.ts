import { createRouter } from "./context";
import superjson from "superjson";
import { workoutRouter } from "./routers/workout";
import { exerciseRouter } from "./routers/exercise";
import { entryRouter } from "./routers/entry";
import { profileRouter } from "./routers/profile";
import { setRouter } from "./routers/set";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("workout.", workoutRouter)
  .merge("exercise.", exerciseRouter)
  .merge("entry.", entryRouter)
  .merge("profile.", profileRouter)
  .merge("set.", setRouter);

export type AppRouter = typeof appRouter;
