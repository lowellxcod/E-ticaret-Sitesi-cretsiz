import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { slugify } from '@/lib/utils';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const categorySlug = searchParams.get("categorySlug");
        const isFeatured = searchParams.get("isFeatured");
        const search = searchParams.get("search");

        const where: any = {};

        if (categorySlug) {
            where.OR = [
                { categorySlug: categorySlug },
                { subCategorySlug: categorySlug }
            ];
        }

        if (isFeatured === 'true') {
            where.featured = true;
        }

        if (search) {
            where.items = {
                name: {
                    contains: search,
                    mode: 'insensitive'
                }
            };
            // Prisma search structure varies, usually:
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { category: { contains: search, mode: 'insensitive' } }
            ];
            // Note: If both categorySlug and search exist, we need to be careful with OR.
            if (categorySlug) {
                where.AND = [
                    {
                        OR: [
                            { categorySlug: categorySlug },
                            { subCategorySlug: categorySlug }
                        ]
                    },
                    {
                        OR: [
                            { name: { contains: search, mode: 'insensitive' } },
                            { description: { contains: search, mode: 'insensitive' } }
                        ]
                    }
                ];
                delete where.OR; // Clear the previous OR
            }
        }

        const products = await db.product.findMany({
            where,
            orderBy: {
                createdAt: 'desc',
            }
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error("[PRODUCTS_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const adminEmail = process.env.ADMIN_EMAIL;

        if (!session || session.user?.email !== adminEmail) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { name, price, discountPrice, category, categorySlug, subCategorySlug, image, description, inStock } = body;

        if (!name || !price || !category || !image || !description) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // 1. Find or Create Category
        // For MVP, we'll try to find by slug, or create if not exists
        const slugToUse = categorySlug || category.toLowerCase().replace(/ /g, '-');

        let categoryRecord = await db.category.findUnique({
            where: { slug: slugToUse }
        });

        if (!categoryRecord) {
            categoryRecord = await db.category.create({
                data: {
                    name: category,
                    slug: slugToUse,
                    icon: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"
                }
            });
        }


        // Generate base slug
        let slug = slugify(name);

        // Ensure uniqueness (simple append check)
        const existingProduct = await db.product.findUnique({ where: { slug } });
        if (existingProduct) {
            slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
        }

        const product = await db.product.create({
            data: {
                name,
                slug,
                price: parseFloat(price),
                discountPrice: discountPrice ? parseFloat(discountPrice) : null,
                description,
                image: image, // Main image
                gallery: [image], // Legacy support or gallery init
                category: categoryRecord.name,
                categorySlug: categoryRecord.slug,
                subCategorySlug: subCategorySlug || null,
                stock: (inStock === 'true' || inStock === true) ? 100 : 0,
            }
        });

        return NextResponse.json(product);

    } catch (error) {
        console.error("[PRODUCTS_POST] Detailed Error:", error);
        return new NextResponse(`Internal error: ${error instanceof Error ? error.message : 'Unknown'}`, { status: 500 });
    }
}
