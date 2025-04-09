import NextAuth, { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    isAdmin: boolean;
    isPaidSubscriber: boolean;
    name: string;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    isAdmin: boolean;
    isPaidSubscriber: boolean;
    name: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day session timeout 
    updateAge: 60 * 30, // 30 min session refresh
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "select_account", // 🔁 Always show Google account picker
        },
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        const { id, email, isAdmin, isPaidSubscriber, name} = user;
        return { id, email, isAdmin, isPaidSubscriber, name };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.isAdmin = (user as any).isAdmin ?? false;
        token.isPaidSubscriber = (user as any).isPaidSubscriber ?? false;
        // Propagate the name from the user to the token:
        token.name = user.name;
      }
      return token;
    },
  
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.isAdmin = token.isAdmin;
      session.user.isPaidSubscriber = token.isPaidSubscriber;
      // Include the name field in the session user:
      session.user.name = token.name;
      return session;
    },
  },

  pages: {
    // signIn: "/login" // Optional: add custom login page
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
