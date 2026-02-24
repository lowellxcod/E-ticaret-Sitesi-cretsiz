"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

import Container from "../ui/Container";
import ProductCard from "../products/ProductCard";

const FeaturedProducts = () => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    const data = await res.json();
                    // Take first 10 items or filter for 'featured' if API supports it
                    setProducts(data.slice(0, 10));
                }
            } catch (error) {
                console.error("Failed to fetch featured products", error);
            }
        };

        fetchProducts();
    }, []);
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Dynamic Background Glows */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] opacity-30 animate-pulse pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-secondary/20 rounded-full blur-[120px] opacity-20 pointer-events-none" />

            <Container className="relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="space-y-4 max-w-2xl">
                        <span className="text-primary text-[10px] uppercase tracking-[0.5em] font-black">Elite_Equipment_Drop</span>
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                            Öne <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Çıkanlar</span>
                        </h2>
                        <p className="text-gray-light font-medium text-lg leading-relaxed">
                            Sektörün en gelişmiş donanımları. Elit operatörler için özel olarak seçildi.
                        </p>
                    </div>
                </div>

                <div className="relative px-4 md:px-12">
                    <Swiper
                        grabCursor={true}
                        effect={'creative'}
                        speed={800}
                        creativeEffect={{
                            prev: {
                                shadow: true,
                                translate: ['-120%', 0, -500],
                            },
                            next: {
                                shadow: true,
                                translate: ['120%', 0, -500],
                            },
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Navigation, Pagination, EffectCreative]}
                        className="featured-swiper !pb-24 !px-4"
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 20 },
                            768: { slidesPerView: 2, spaceBetween: 30 },
                            1200: { slidesPerView: 3, spaceBetween: 40 },
                        }}
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div className="p-4 transition-all duration-500 hover:-translate-y-4 group">
                                    <ProductCard product={product} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </Container>

            <style jsx global>{`
                .featured-swiper .swiper-pagination-bullet {
                    background: rgba(168, 85, 247, 0.2) !important;
                    width: 12px;
                    height: 12px;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .featured-swiper .swiper-pagination-bullet-active {
                    background: #A855F7 !important;
                    width: 40px;
                    border-radius: 8px;
                    box-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
                }
                .featured-swiper .swiper-button-next,
                .featured-swiper .swiper-button-prev {
                    color: #A855F7 !important;
                    width: 60px;
                    height: 60px;
                    background: rgba(168, 85, 247, 0.05);
                    border: 1px solid rgba(168, 85, 247, 0.1);
                    border-radius: 50%;
                    backdrop-filter: blur(10px);
                    transition: all 0.4s;
                }
                .featured-swiper .swiper-button-next:after,
                .featured-swiper .swiper-button-prev:after {
                    font-size: 20px;
                    font-weight: 900;
                }
                .featured-swiper .swiper-button-next:hover,
                .featured-swiper .swiper-button-prev:hover {
                    background: rgba(168, 85, 247, 0.2);
                    border-color: #A855F7;
                    box-shadow: 0 0 30px rgba(168, 85, 247, 0.3);
                }
                @media (max-width: 768px) {
                    .featured-swiper .swiper-button-next,
                    .featured-swiper .swiper-button-prev {
                        display: none;
                    }
                }
            `}</style>
        </section>
    );
};

export default FeaturedProducts;
