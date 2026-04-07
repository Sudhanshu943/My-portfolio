import GitHubProvider from "next-auth/providers/github";
import type { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

export async function verifySession(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return null;
  }
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  if (!adminEmail) {
    return null;
  }
  return session.user.email.toLowerCase() === adminEmail ? session : null;
}

export function requireAuth(): NextResponse {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function authGuard(req: NextRequest): Promise<null | typeof session> {
  const session = await verifySession(req);
  if (!session) {
    return null;
  }
  return session;
}