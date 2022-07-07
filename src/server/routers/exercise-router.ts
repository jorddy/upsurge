import { createProtectedRouter } from "../context";

export const exerciseRouter = createProtectedRouter().query("get-by-id", {
  async resolve({ ctx }) {
    return await ctx.prisma.exercise.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { updatedAt: "desc" },
      include: {
        entries: {
          include: { sets: true }
        }
      }
    });
  }
});
