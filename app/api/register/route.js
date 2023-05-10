import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

import { hash } from "argon2";

export async function POST(req) {
    const { name, email, password } = await req.json();

    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                email: true,
                langs: true,
                city: true,
                password: false,
            },
        });

        if (!user) {
            const hashedPassword = await hash(password);

            const result = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
                select: {
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
