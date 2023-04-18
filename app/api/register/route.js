import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
    const { name, email, password } = await req.json();

    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            const result = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                },
            });
            return NextResponse.json({ result });
        }

        return new Response(
            JSON.stringify({
                message: "User with that email already exists!",
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
