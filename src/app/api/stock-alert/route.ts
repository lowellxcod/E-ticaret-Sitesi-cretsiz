import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import db from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { productId, email } = await req.json();
        const session = await getServerSession(authOptions);

        if (!productId || !email) {
            return new NextResponse("Product ID and Email are required", { status: 400 });
        }

        // Check if product exists
        const product = await db.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            return new NextResponse("Product not found", { status: 404 });
        }

        // Create subscription
        await db.stockAlert.create({
            data: {
                productId,
                email,
                // @ts-ignore
                userId: (session?.user as any)?.id || null,
            }
        });

        return NextResponse.json({ success: true, message: "Stok geldiğinde sizi bilgilendireceğiz!" });
    } catch (error) {
        console.error("Stock Alert Subscription Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
