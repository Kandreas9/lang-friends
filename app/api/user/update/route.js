import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
    const { email, langs, city } = await req.json();

    try {
        if (email && langs && city) {
            const result = await prisma.user.update({
                where: {
                    email,
                },
                data: {
                    email,
                    langs,
                    city,
                },
                select: {
                    id: true,
                    email: true,
                    langs: true,
                    city: true,
                    password: false,
                },
            });
            return NextResponse.json({ result });
        }

        return new Response(
            JSON.stringify({
                message: "User could not be updated!",
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
