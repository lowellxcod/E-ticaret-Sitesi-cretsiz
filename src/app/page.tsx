/**
 * @license
 * Telif Hakkı (c) 2024-2026 lowellxcod & luwex13. Tüm hakları saklıdır.
 * Bu yazılımın izinsiz satılması, sızdırılması veya üzerinde hak iddia edilmesi kesinlikle yasaktır.
 */
"use client";

import Hero from "../components/home/Hero";
import CategoryGrid from "../components/home/CategoryGrid";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Newsletter from "../components/home/Newsletter";

export default function Home() {
    return (
        <div className="flex flex-col">
            <Hero />
            <FeaturedProducts />
            <CategoryGrid />
            <WhyChooseUs />
            <Newsletter />
        </div>
    );
}
