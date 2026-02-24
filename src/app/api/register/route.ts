import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, name, password } = body;

        if (!email || !name || !password) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        const exists = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (exists) {
            return new NextResponse("Kullanıcı zaten mevcut", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });

        return NextResponse.json(user);
    } catch (error: any) {
        console.log(error, "REGISTRATION_ERROR");
        return new NextResponse("Internal Error", { status: 500 });
    }
}
