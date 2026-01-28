"use client";

import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useRef } from "react";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import "swiper/css";

export default function HeroSection() {
    const [, setCurrentSlide] = useState(0);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const slides = [
        {
            title: "Learn Italian Uma",
            subText: "Join Uma's Italian language courses and immerse yourself in the beauty of Italian culture and language. Learn at your own pace with expert guidance.",
            button: {
                text: "Get Started",
                link: "#",
            },
            background: "/assets/images/banners/slide01.jpg",
            price: "$49",
        },
        {
            title: "  Italian Uma",
            subText: "Join Uma's Italian language courses and immerse yourself in the beauty of Italian culture and language. Learn at your own pace with expert guidance.",
            button: {
                text: "Get Started",
                link: "#",
            },
            background: "/assets/images/banners/slide01.jpg",
            price: "$49",
        },
    ];

    return (
        <>
            <style jsx global>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .animate-slideInUp {
                    animation: slideInUp 0.8s ease-out forwards;
                }

                .animate-fadeIn {
                    animation: fadeIn 1s ease-out forwards;
                }

                .animate-scaleIn {
                    animation: scaleIn 0.6s ease-out forwards;
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .animate-slideInRight {
                    animation: slideInRight 0.8s ease-out forwards;
                }

                .animation-delay-200 {
                    animation-delay: 0.2s;
                    opacity: 0;
                }

                .animation-delay-400 {
                    animation-delay: 0.4s;
                    opacity: 0;
                }

                .animation-delay-600 {
                    animation-delay: 0.6s;
                    opacity: 0;
                }

                /* Gradient text animation */
                @keyframes gradientShift {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                .gradient-text {
                    background: linear-gradient(90deg, #2563eb, #7c3aed, #2563eb);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gradientShift 3s ease infinite;
                }

                /* Button shimmer effect */
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                .btn-shimmer::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    animation: shimmer 2s infinite;
                }
            `}</style>

            <section className="relative w-full h-[75vh] md:h-[80vh] overflow-hidden">
                <Swiper modules={[Autoplay, Pagination, Navigation, EffectFade]}
                    effect="fade"
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onInit={(swiper) => {
                        // @ts-ignore
                        swiper.params.navigation.prevEl = prevRef.current;
                        // @ts-ignore
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                    loop
                    speed={1000}
                    onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
                    className="h-full group">
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-full h-full">
                                <div className="absolute inset-0 bg-cover bg-center md:bg-start bg-no-repeat transform scale-110 transition-transform duration-[6000ms] group-hover:scale-105"
                                    style={{ backgroundImage: `url(${slide.background})` }} />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 md:via-black/50 to-black/40 md:to-transparent"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                                {/* Content Container */}
                                <div className="relative z-10 flex items-center h-full px-8 sm:px-6 md:px-8 lg:px-10">
                                    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl md:mx-0 md:ml-8 lg:ml-16 xl:ml-24 2xl:ml-32">
                                        <div className="relative overflow-hidden shadow-2xl bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl animate-scaleIn">
                                            <div className="p-6 space-y-2 sm:p-8 md:p-10 lg:p-12 sm:space-y-5 md:space-y-3">
                                                {/* Title */}
                                                <h1 className="text-2xl lg:text-3xl font-bold leading-tight text-[#2F2F32] animate-slideInUp">
                                                    {slide.title}
                                                </h1>

                                                {/* Description */}
                                                <p className="leading-relaxed text-[#7D7E7F] animate-slideInUp animation-delay-200">
                                                    {slide.subText}
                                                </p>

                                                {/* CTA Button */}
                                                <div className="flex flex-col gap-4 pt-3 sm:pt-4 md:pt-6 animate-slideInUp animation-delay-400">
                                                    <Link href={slide.button.link} className="relative px-6 py-3 overflow-hidden font-semibold text-center text-white transition-all duration-300 transform md:w-[40%] md:px-2 md:py-2 group bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 active:scale-95 btn-shimmer">
                                                        <div className="absolute inset-0 transition-transform duration-300 origin-left transform scale-x-0 bg-gradient-to-r from-blue-700 to-blue-800 group-hover:scale-x-100"></div>
                                                        <span className="relative flex items-center justify-center gap-2 text-sm tracking-wide uppercase sm:gap-3 sm:text-base">
                                                            {slide.button.text}
                                                            <CircleArrowRight className="w-5 h-5 transition-transform sm:w-6 sm:h-6 group-hover:translate-x-1" />
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>

                                            {/* Price Badge */}
                                            <div className="absolute bottom-0 hidden overflow-hidden lg:block -right-12 sm:w-24 sm:h-24 md:w-36 md:h-36 animate-slideInRight animation-delay-600">
                                                <div className="absolute transform -rotate-45 bg-gradient-to-br from-orange-400 to-[#f9a134] text-white text-center font-bold sm:py-1.5 sm:left-[-18px] sm:bottom-[22px] w-[140px] sm:w-[160px] shadow-lg text-sm">
                                                    {slide.price}
                                                </div>
                                            </div>
                                            {/* Price Badge for mobile screens */}
                                            <div className="absolute top-0 block w-12 h-12 right-8 lg:hidden sm:w-16 sm:h-16 animate-slideInRight animation-delay-600">
                                                <div className="absolute transform rotate-[36deg] bg-gradient-to-br from-orange-400 to-[#f9a134] text-white text-center font-bold py-1 left-[-10px] top-[10px] w-[120px] sm:w-[90px] shadow-lg text-sm">
                                                    {slide.price}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Navigation Buttons */}
                <div className="absolute z-20 flex items-center gap-2 sm:gap-3 bottom-4 sm:bottom-6 right-4 sm:right-6 animate-fadeIn animation-delay-600">
                    <button ref={prevRef} className="flex items-center justify-center w-10 h-10 text-white transition-all duration-300 rounded-full shadow-lg md:w-10 md:h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:scale-110 active:scale-95 group">
                        <CircleArrowLeft className="w-5 h-5 transition-transform sm:w-6 sm:h-6" />
                    </button>

                    <button ref={nextRef} className="flex items-center justify-center w-10 h-10 text-white transition-all duration-300 rounded-full shadow-lg md:w-10 md:h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:scale-110 active:scale-95 group">
                        <CircleArrowRight className="w-5 h-5 transition-transform sm:w-6 sm:h-6" />
                    </button>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute z-20 -translate-x-1/2 bottom-6 sm:bottom-8 md:bottom-10 left-1/2 animate-bounce">
                    <div className="flex justify-center w-5 h-8 border-2 rounded-full sm:w-6 sm:h-10 border-white/50 backdrop-blur-sm bg-white/10">
                        <div className="w-1 sm:w-1.5 h-2.5 sm:h-3 mt-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                </div>
            </section>
        </>
    );
}