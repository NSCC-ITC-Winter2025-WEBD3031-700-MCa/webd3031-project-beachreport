import NextAuth, { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { JWT } from "next-auth/jwt";

// Prisma client
const prisma = new PrismaClient();

// Extend NextAuth types (make sure this is at the top of the file!!)
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    isAdmin: boolean;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
    email: string;
    isAdmin: boolean;
  }
}

// Define authentication options
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
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

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        // Check password
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        
        return {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin, 
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user) {
        return { ...token, id: user.id, email: user.email, isAdmin: user.isAdmin };
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          isAdmin: token.isAdmin,
        },
      };
    },
  },
  pages: {},
};

// Export API route handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
