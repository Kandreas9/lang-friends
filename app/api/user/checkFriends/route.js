import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
    const { userId, potentialFriendsId } = await req.json();

    try {
        if (userId && potentialFriendsId) {
            const result = await prisma.friends.findMany({
                where: {
                    user_id: userId,
                },
            });

            const isFriends = result.filter((friend) => {
                return friend.friend_id === potentialFriendsId;
            });

            if (isFriends.length === 1) {
                return NextResponse.json({ result: isFriends[0] });
            }
        }

        return new Response(
            JSON.stringify({
                message: "User is not liked!",
                ok: false,
            }),
            {
                status: 200,
            }
        );
    } catch (err) {
        console.log(err.message);
    }
}
