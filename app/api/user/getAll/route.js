import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                langs: true,
                city: true,
                password: false,
            },
        });

        return NextResponse.json({ users });
    } catch (err) {
        console.log(err.message);
    }
}
