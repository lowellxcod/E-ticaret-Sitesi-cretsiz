import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { rating, comment, images } = body;
        const productId = params.id;

        const prisma = new PrismaClient();

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) return new NextResponse("User not found", { status: 404 });

        const review = await prisma.review.create({
            data: {
                rating,
                comment,
                images: images || [],
                userId: user.id,
                productId
            },
            include: {
                user: {
                    select: { name: true } // Include user image if available
                }
            }
        });

        return NextResponse.json(review);
    } catch (error) {
        console.error("Review POST error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if admin
        if (session.user.email !== process.env.ADMIN_EMAIL) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        const prisma = new PrismaClient();
        const { searchParams } = new URL(req.url);
        const reviewId = searchParams.get('reviewId');

        if (!reviewId) return new NextResponse("Missing Review ID", { status: 400 });

        await prisma.review.delete({
            where: { id: reviewId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Review DELETE error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const prisma = new PrismaClient();
        const reviews = await prisma.review.findMany({
            where: { productId: params.id },
            include: {
                user: { select: { name: true } }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(reviews);
    } catch (error) {
        console.error("Review GET error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
