import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/server/db";

declare module "next-auth" {
  interface Session {
    user: User & { id: string };
  }
}

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    })
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session({ session, user }) {
      session.user.id = user?.id;
      return session;
    }
  }
};

export default NextAuth(nextAuthOptions);
