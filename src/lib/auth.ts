import GitHubProvider from "next-auth/providers/github";
import type { AuthOptions } from "next-auth";

const authorizedEmails = (process.env.ADMIN_EMAIL || "").split(",").map((e) => e.trim());

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_SECRET || process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user }) {
      if (!authorizedEmails.length) {
        return false;
      }
      const email = user.email?.toLowerCase();
      return authorizedEmails.some((e) => e.toLowerCase() === email);
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
};