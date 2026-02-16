"use client";

import { CircleArrowLeft, CircleArrowRight, CircleArrowUp, Clock } from "lucide-react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";

type BlogAuthor = {
    name?: string;
};

type Blog = {
    id: number;
    slug: string;
    title: string;
    published_date?: string;
    thumbnail: string | null;
    author?: BlogAuthor;
};

interface LatestNewsSectionProps {
    blogs: Blog[];
}

export default function LatestNewsSection({ blogs }: LatestNewsSectionProps) {
    const backendOrigin = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/api\/?$/, "");
    const items = (blogs || []).slice(0, 10);

    return (
        <section id="latest-news" className="bg-white">
            <div className="max-w-6xl px-8 py-16 mx-5 md:mx-10 lg:mx-auto">

                {/* Header */}
                <motion.div
                    className="flex items-center justify-between mb-10"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}>
                    <div>
                        <h2 className="font-semibold text-[#4783F3]">Blog</h2>
                        <p className="text-2xl md:text-3xl font-bold text-[#2F2F32]">Latest News</p>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Link href="/blogs"
                            className="w-[7.8rem] px-4 group py-2 border-[#4783F3] border-2 rounded-3xl text-[#4783F3] hover:bg-[#4783F3] hover:text-white transition-colors duration-300 flex items-center gap-2">
                            View All
                            <CircleArrowUp className="w-5 h-5 transition-transform duration-300 rotate-45 group-hover:rotate-90" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Swiper Slider */}
                <Swiper
                    slidesPerView={1}
                    spaceBetween={16}
                    navigation={{
                        nextEl: ".swiper-next",
                        prevEl: ".swiper-prev",
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 },
                    }}
                    modules={[Navigation, Autoplay]}
                    className="swiper-container">
                    {items.map((item, index) => {
                        const imageUrl = item.thumbnail
                            ? item.thumbnail.startsWith("http")
                                ? item.thumbnail
                                : `${backendOrigin}/${item.thumbnail.replace(/^\/+/, "")}`
                            : "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop";

                        return (
                            <SwiperSlide key={item.id}>
                                <motion.div
                                    className="transition bg-white border cursor-pointer group"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
                                    <Link href={`/blogs/${item.slug}`} className="block">
                                        <div className="relative w-full mb-4 overflow-hidden h-52">
                                            <Image src={imageUrl} alt={item.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                                        </div>

                                        <div className="px-4 pb-2">
                                            <span className="text-[#8F8F8F]">{item.author?.name || ""}</span>
                                            <h3 className="text-lg font-semibold text-[#2F2F32] group-hover:text-[#4783F3]">{item.title}</h3>
                                        </div>

                                        <div className="flex items-center justify-between px-4 pb-2">
                                            <p className="mt-2 text-[#8F8F8F] flex items-center gap-2">
                                                <Clock className="w-4 text-[#F9A134]" />
                                                {item.published_date ? new Date(item.published_date).toLocaleDateString("en-GB") : ""}
                                            </p>
                                        </div>
                                    </Link>
                                </motion.div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                {/* Navigation Buttons */}
                <div className="flex justify-between gap-4 mt-6">
                    <button className="swiper-prev px-3 py-1 bg-[#4783F3] text-white rounded-full flex items-center gap-1">
                        <CircleArrowLeft className="w-5 h-5" /> Prev
                    </button>

                    <button className="swiper-next px-3 py-1 bg-[#4783F3] text-white rounded-full flex items-center gap-1">
                        Next <CircleArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
