import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET({ nextUrl }) {
    const slugs = nextUrl.pathname.split("/").filter(Boolean);
    const slug = slugs.slice(-1);
    const userId = slug[0];

    try {
        const user = await prisma.messages.findMany({
            where: {
                user_id: userId,
            },
        });

        return NextResponse.json({ user });
    } catch (err) {
        console.log(err.message);
    }
}
