"use client";

import React from "react";
import Container from "../../components/ui/Container";
import ProductCard from "../../components/products/ProductCard";
import { motion } from "framer-motion";
export default function ProductsPage() {
    const [products, setProducts] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen pb-24 bg-background">
            <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background z-0" />
                <Container className="relative z-10 text-center">
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase mb-4">Tüm Donanımlar</h1>
                    <p className="text-gray-light max-w-xl mx-auto font-medium text-lg">Nexus ağındaki tüm ekipmanları keşfedin.</p>
                </Container>
            </div>

            <Container className="mt-12">
                {loading ? (
                    <div className="text-center py-20 text-gray-500">Yükleniyor...</div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 border border-white/10 rounded-3xl">
                        Ürün bulunamadı.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}
