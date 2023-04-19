import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET({ nextUrl }) {
    const slugs = nextUrl.pathname.split("/").filter(Boolean);
    const slug = slugs.slice(-1);
    const id = slug[0];

    try {
        const friends = await prisma.friends.findMany({
            where: {
                user_id: id,
            },
        });

        if (!friends) {
            return new Response(
                JSON.stringify({
                    message: "User has no friends!",
                    ok: false,
                }),
                {
                    status: 200,
                }
            );
        }

        return NextResponse.json({ friends });
    } catch (err) {
        console.log(err.message);
    }
}
