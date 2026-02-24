import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { hash } from 'bcrypt';

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { name, email, password } = body;

        if (!name || !email) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        // Prepare update data
        const updateData: any = { name, email };

        // If password is provided, hash it and add to update
        if (password) {
            const hashedPassword = await hash(password, 10);
            updateData.password = hashedPassword;
        }

        const updatedUser = await db.user.update({
            where: { email: session.user.email },
            data: updateData
        });

        // Don't return password
        const { password: _, ...userWithoutPassword } = updatedUser;

        return NextResponse.json(userWithoutPassword);
    } catch (error) {
        console.error("[USER_SETTINGS_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
