import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET({ nextUrl }) {
    const slugs = nextUrl.pathname.split("/").filter(Boolean);
    const slug = slugs.slice(-1);
    const id = slug[0];

    try {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        return NextResponse.json({ user });
    } catch (err) {
        console.log(err.message);
    }
}
