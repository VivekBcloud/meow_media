import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.SECRET,
    },
    // pages: {
    //     signIn: "/api/auth/signin",
    //     signOut: "/api/auth/signout",
    //     error: "/api/auth/error",
    // },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
        async session({ session, user, token }) {
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token;
        },
    },
    debug: false,
});
