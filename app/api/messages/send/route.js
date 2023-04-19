import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
    const { message } = await req.json();

    try {
        if (message) {
            const result = await prisma.message.create({
                data: {
                    ...message,
                },
            });
            return NextResponse.json({ result });
        }

        return new Response(
            JSON.stringify({
                message: "Message could not be created!",
                ok: false,
            }),
            {
                status: 409,
            }
        );
    } catch (err) {
        console.log(err.message);
    }
}
