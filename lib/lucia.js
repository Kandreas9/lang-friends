import lucia from "lucia-auth";
import prisma from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

export const auth = lucia({
    adapter: prisma(new PrismaClient()),
    env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
    transformUserData: (userData) => {
        return {
            userId: userData.id,
            email: userData.email,
        };
    },
});
