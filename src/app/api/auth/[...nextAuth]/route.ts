import type { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '../../../../lib/prisma';
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import nextAuth from "next-auth";
import NextAuth from "next-auth/next";

export const authOptions:NextAuthOptions = {
adapter:PrismaAdapter(prisma),
secret: process.env.NEXTAUTH_SECRET,
session: { strategy: "database"},
callbacks: {
  async session({ session, user }) {
    if (session.user) {
      session.user.id = user.id;
    }
    return session;
  },
},
providers:[
    CredentialProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email", placeholder: "johndoe@example.com" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            // basic defensive checks
            if (!credentials?.email || !credentials?.password) return null;
    
            // find user by email
            const user = await prisma.user.findUnique({
              where: { email: credentials.email },
            });
    
            // if no user or user has no password (social-only), reject
            if (!user || !user.password) return null;
    
            // compare password with bcrypt
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (!isValid) return null;
    
            // return the minimal user object (NextAuth will store user info via adapter)
            return { id: user.id, email: user.email, name: user.name ?? undefined };
          },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
              params: { prompt: "consent", access_type: "offline", response_type: "code" }
            }
        }),
]
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST } ;