import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
    const { original, user } = await req.json();

    try {
        const friendResult = await prisma.friends.create({
            data: {
                user_id: original.id,
                friend_id: user.id,
                status: true,
            },
        });

        // const data = original.userFriends
        //     ? [...original.userFriends, friendResult]
        //     : [friendResult];

        // const result = await prisma.user.update({
        //     where: {
        //         id: original.id,
        //     },
        //     data: {
        //         friends: data,
        //     },
        // });
        //

        if (!friendResult) {
            return new Response(
                JSON.stringify({
                    message: "User is already liked.",
                    ok: false,
                }),
                {
                    status: 409,
                }
            );
        }

        return NextResponse.json({ result: friendResult });
    } catch (err) {
        console.log(err.message);
    }
}
