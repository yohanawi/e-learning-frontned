"use client";

import { CircleArrowLeft, CircleArrowRight, Quote, Star } from "lucide-react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import Image from "next/image";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css";

export default function TestimonialSection() {

    const testimonials = [
        {
            name: "Maria Rossi",
            position: "Student",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
            quote: "Uma Academy has transformed my Italian learning experience. The courses are engaging and the community is supportive.",
            rating: 5,
        },
        {
            name: "Luca Bianchi",
            position: "Professional Translator",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
            quote: "Thanks to Uma, I was able to improve my Italian skills and advance my career. The flexible learning schedule is perfect for busy professionals.",
            rating: 4,
        },
        {
            name: "Giulia Verdi",
            position: "Freelancer",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
            quote: "The video-based courses at Uma are top-notch. I love how I can learn at my own pace and revisit lessons whenever I need to.",
            rating: 5,
        },
        {
            name: "Marco Neri",
            position: "Entrepreneur",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
            quote: "Uma Academy provided me with the skills I needed to expand my business into Italy. The practical approach to learning is fantastic.",
            rating: 5,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 12,
            },
        },
    };

    return (
        <section className="relative py-10 overflow-hidden lg:py-20 bg-gradient-to-br from-indigo-100 via-white to-sky-100">
            <div className="relative z-10 px-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div className="mb-8 text-center"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}>
                    <motion.h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2F2F32] mb-3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}>
                        What Our Learners Say
                    </motion.h2>
                    <motion.p className="mt-3 text-base md:text-lg text-[#7D7E7F] max-w-2xl mx-auto px-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}>
                        Real stories from people transforming their Italian skills with Uma.
                    </motion.p>
                </motion.div>

                {/* Swiper Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}>
                    <Swiper className="mySwiper !pb-10"
                        spaceBetween={16}
                        slidesPerView={1}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 32,
                            },
                        }}
                        loop
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{ clickable: true, el: ".swiper-pagination" }}
                        navigation={{ nextEl: ".swiper-nextt", prevEl: ".swiper-prevt" }}
                        modules={[Pagination, Navigation, Autoplay]}>

                        {testimonials.map((t, i) => (
                            <SwiperSlide key={i}>
                                <motion.div className="p-4 sm:p-5 md:p-6 bg-white shadow-lg hover:shadow-2xl rounded-2xl sm:rounded-3xl flex flex-col justify-between h-[280px] sm:h-[300px] md:h-[320px] transition-all duration-300 hover:scale-[1.02] group"
                                    variants={cardVariants}
                                    whileHover={{
                                        y: -8,
                                        transition: { duration: 0.3 }
                                    }}>

                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        whileInView={{ scale: 1, rotate: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}>
                                        <Quote className="w-6 h-6 transition-transform duration-300 sm:w-7 sm:h-7 md:w-8 md:h-8 text-sky-400 opacity-80 group-hover:scale-110" />
                                    </motion.div>

                                    <motion.blockquote
                                        className="p-2 text-base italic leading-relaxed text-left sm:text-lg md:text-lg` text-slate-700"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}>
                                        {t.quote.split(" ").slice(0, 15).join(" ")}
                                        {t.quote.split(" ").length > 15 ? "..." : ""}
                                    </motion.blockquote>

                                    <motion.div
                                        className="flex items-center gap-3 sm:gap-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.1 + 0.4 }}>

                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}>
                                            <Image
                                                src={t.image}
                                                alt={t.name}
                                                width={64}
                                                height={64}
                                                className="object-cover w-12 h-12 transition-all duration-300 rounded-full shadow-lg sm:w-14 sm:h-14 md:w-16 md:h-16 ring-2 ring-sky-100 group-hover:ring-sky-300"
                                            />
                                        </motion.div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-base md:text-lg text-[#2F2F32] truncate">
                                                {t.name}
                                            </h3>
                                            <p className="text-sm text-[#7D7E7F] truncate">
                                                {t.position}
                                            </p>
                                            <div className="flex mt-1 gap-0.5">
                                                {[...Array(5)].map((_, starIdx) => (
                                                    <motion.div key={starIdx}
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{
                                                            duration: 0.3,
                                                            delay: i * 0.1 + 0.5 + starIdx * 0.05
                                                        }}>
                                                        <Star className={`w-5 h-5 transition-all duration-300 ${starIdx < t.rating ? "text-amber-400 fill-amber-400 group-hover:scale-110" : "text-gray-300"}`} />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Controls */}
                    <motion.div className="flex items-center justify-center gap-4 -mt-4 sm:mt-4 sm:gap-6 md:gap-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 }}>

                        <motion.button className="p-1 text-white transition-all duration-300 bg-blue-500 rounded-full swiper-prevt hover:bg-blue-600"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}>
                            <CircleArrowLeft className="w-5 h-5 sm:w-8 sm:h-8" />
                        </motion.button>

                        <motion.button
                            className="p-1 text-white transition-all duration-300 bg-blue-500 rounded-full swiper-nextt hover:bg-blue-600"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}>
                            <CircleArrowRight className="w-5 h-5 sm:w-8 sm:h-8" />
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}