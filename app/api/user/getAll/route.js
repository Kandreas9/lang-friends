import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
    try {
        const users = await prisma.user.findMany();

        return NextResponse.json({ users });
    } catch (err) {
        console.log(err.message);
    }
}
