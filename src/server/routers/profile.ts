import { createProtectedRouter } from "../context";
import { profileValidator } from "@/server/shared/profile";

export const profileRouter = createProtectedRouter().mutation("update", {
  input: profileValidator,
  resolve: ({ input, ctx }) =>
    ctx.prisma.user.update({
      data: input,
      where: { id: ctx.user.id }
    })
});
