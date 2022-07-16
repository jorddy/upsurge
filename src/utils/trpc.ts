import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "@/server/router";
import type { inferProcedureOutput } from "@trpc/server";

export const trpc = createReactQueryHooks<AppRouter>();

export type InferQueryOutput<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;
