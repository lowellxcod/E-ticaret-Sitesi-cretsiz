import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { slugify } from '@/lib/utils';

// Helper for admin check
async function checkAdmin() {
    const session = await getServerSession(authOptions);
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!session || session.user?.email !== adminEmail) {
        return false;
    }
    return true;
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const product = await db.product.findUnique({
            where: { id: params.id }
        });

        if (!product) {
            return new NextResponse("Product not found", { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("[PRODUCT_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        if (!await checkAdmin()) return new NextResponse("Unauthorized", { status: 401 });

        await db.product.delete({
            where: { id: params.id }
        });

        return new NextResponse("Product deleted", { status: 200 });
    } catch (error) {
        console.error("[PRODUCT_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        if (!await checkAdmin()) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const { name, price, discountPrice, category, subCategorySlug, image, description, inStock, slug: newSlug } = body;

        // Basic validation
        if (!name || !price || !category || !image) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Logic to update slug if name changed, or keep existing
        // For simplicity, we might keep the slug unless explicitly requested, 
        // but if name changes significantly, slug update is good for SEO but bad for existing links.
        // Let's rely on the incoming data or just update other fields. 
        // If we want to support slug updates, we need to handle uniqueness again.

        // Retrieve existing category info or find new
        let categoryRecord = await db.category.findFirst({
            where: { name: category } // simplified lookup
        });

        // Data preparation
        const updateData: any = {
            name,
            price: parseFloat(price),
            discountPrice: discountPrice ? parseFloat(discountPrice) : null,
            description,
            image,
            gallery: [image],
            stock: (inStock === 'true' || inStock === true) ? 100 : 0,
            category: category,
            subCategorySlug: subCategorySlug || null,
        };

        if (categoryRecord) {
            updateData.categorySlug = categoryRecord.slug;
        }

        const product = await db.product.update({
            where: { id: params.id },
            data: updateData
        });

        return NextResponse.json(product);

    } catch (error) {
        console.error("[PRODUCT_UPDATE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
