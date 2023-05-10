import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

import { verify } from "argon2";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            credentials: {
                email: { label: "Email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                try {
                    const user = await prisma.user.findFirst({
                        where: {
                            email: credentials.email,
                        },
                    });

                    const passCheck = await verify(
                        user.password,
                        credentials.password
                    );

                    if (user && passCheck) {
                        // Any object returned will be saved in `user` property of the JWT
                        return user;
                    } else {
                        // If you return null then an error will be displayed advising the user to check their details.
                        return null;

                        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                    }
                } catch (err) {
                    throw new Error(err);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = token;

            return session;
        },
    },
    pages: {
        signIn: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
