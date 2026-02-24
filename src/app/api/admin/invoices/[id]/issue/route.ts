import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/db";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        const adminEmail = process.env.ADMIN_EMAIL;

        if (!session || session.user?.email !== adminEmail) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { id } = params;

        await prisma.order.update({
            where: { id },
            data: {
                invoiceStatus: "ISSUED"
            }
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Invoice Update Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
