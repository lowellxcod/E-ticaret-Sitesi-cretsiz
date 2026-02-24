import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { categorySlug, actionType, amount } = body;

        if (!amount || isNaN(amount)) {
            return NextResponse.json({ error: "Geçersiz miktar" }, { status: 400 });
        }

        // Build where clause
        const where = categorySlug === "all" ? {} : { categorySlug };

        // Fetch products to update (Prisma doesn't support computed updates directly in updateMany for non-numeric fields effectively or with complex logic, but for simple math it might not be fully supported in all adapters, so fetching and updating transactionally is safer or using raw query)
        // Actually, for performance on large datasets, raw query is best. But for this scale, let's try raw query for efficiency.

        // Wait! Prisma updateMany only supports setting static values. It does NOT support "increment" for float fields in all cases cleanly or "multiply". 
        // We need to use $executeRaw or fetch-loop-update.
        // Let's use $executeRaw for correct SQL math.

        let multiplier = 1;
        if (actionType === "increase_percent") multiplier = 1 + (amount / 100);
        if (actionType === "decrease_percent") multiplier = 1 - (amount / 100);

        // For fixed amount, it's + amount or - amount.

        let productsUpdated = 0;

        if (actionType.includes("percent")) {
            // Prisma doesn't easily allow "set: price * multiplier" in updateMany.
            // Using raw query is better.

            // Note: In SQLite/Postgres "price" column name matters. detailed schema check might be needed but usually it is "price".

            // Constructing raw query is risky without knowing exact table name formatting (capitalization).
            // Safer Approach for this environment: Fetch all, loop, update transaction. 

            const products = await prisma.product.findMany({ where });

            // Chunked update to avoid huge transaction
            const updates = products.map((product: any) => {
                let newPrice = product.price;
                if (actionType === "increase_percent") newPrice = Math.round(product.price * (1 + amount / 100));
                if (actionType === "decrease_percent") newPrice = Math.round(product.price * (1 - amount / 100));
                if (actionType === "increase_fixed") newPrice = product.price + amount;
                if (actionType === "decrease_fixed") newPrice = Math.max(0, product.price - amount);

                return prisma.product.update({
                    where: { id: product.id },
                    data: { price: newPrice }
                });
            });

            await prisma.$transaction(updates);
            productsUpdated = updates.length;

        } else {
            // Same logic for fixed
            const products = await prisma.product.findMany({ where });
            const updates = products.map((product: any) => {
                let newPrice = product.price;
                if (actionType === "increase_fixed") newPrice = product.price + amount;
                if (actionType === "decrease_fixed") newPrice = Math.max(0, product.price - amount);

                return prisma.product.update({
                    where: { id: product.id },
                    data: { price: newPrice }
                });
            });
            await prisma.$transaction(updates);
            productsUpdated = updates.length;
        }

        return NextResponse.json({ success: true, count: productsUpdated });

    } catch (error) {
        console.error("Bulk update error:", error);
        return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
    }
}
