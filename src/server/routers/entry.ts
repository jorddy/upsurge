import { createProtectedRouter } from "../context";
import { z } from "zod";
import { entryValidator } from "@/server/shared/entry";
import { updateEntryValidator } from "@/server/shared/update-entry";

export const entryRouter = createProtectedRouter()
  .query("get-by-id", {
    input: z.object({
      id: z.string()
    }),
    resolve: ({ input, ctx }) =>
      ctx.prisma.entry.findUnique({
        where: { id: input.id },
        include: { sets: true }
      })
  })
  .query("get-by-id-with-exercise", {
    input: z.object({
      id: z.string()
    }),
    resolve: ({ input, ctx }) =>
      ctx.prisma.entry.findUnique({
        where: { id: input.id },
        include: { exercise: true, sets: true }
      })
  })
  .mutation("create", {
    input: entryValidator,
    resolve: ({ input, ctx }) =>
      ctx.prisma.entry.create({
        data: {
          notes: input.notes,
          exercise: { connect: { id: input.exerciseId } },
          sets: {
            createMany: { data: input.sets }
          }
        }
      })
  })
  .mutation("delete", {
    input: z.object({
      id: z.string()
    }),
    resolve: ({ input, ctx }) =>
      ctx.prisma.entry.delete({
        where: { id: input.id }
      })
  })
  .mutation("update", {
    input: updateEntryValidator,
    resolve: ({ input, ctx }) =>
      ctx.prisma.entry.update({
        where: { id: input.entryId },
        data: {
          createdAt: input.createdAt,
          notes: input.notes,
          sets: { updateMany: input.sets }
        }
      })
  });
