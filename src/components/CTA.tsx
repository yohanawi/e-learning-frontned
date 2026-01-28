"use client";

import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.2 }
        );

        const ctaSection = document.getElementById('cta-section');
        if (ctaSection) observer.observe(ctaSection);

        return () => {
            if (ctaSection) observer.unobserve(ctaSection);
        };
    }, []);

    return (
        <div id="cta-section" className="relative py-10 overflow-hidden lg:py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-48 h-48 bg-blue-200 rounded-full -top-24 -left-24 sm:w-64 sm:h-64 blur-3xl opacity-20 animate-float"></div>
                <div className="absolute w-64 h-64 bg-purple-200 rounded-full -bottom-24 -right-24 sm:w-96 sm:h-96 blur-3xl opacity-20 animate-float-delayed"></div>
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-blue-100 rounded-full top-1/2 left-1/2 w-72 h-72 sm:w-96 sm:h-96 blur-3xl opacity-10 animate-pulse-slow"></div>
            </div>

            <div className="relative z-10 px-8 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
                <h2 className={`mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 leading-tight transform transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                    Limited Time: Get My Book For Free!
                </h2>
                <div className={`mb-6 sm:mb-8 lg:mb-8 transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                    <p className="max-w-3xl px-4 mx-auto leading-relaxed text-gray-600 sm:text-base lg:text-lg">
                        Learn anytime, anywhere. Best Courses. Top Institution.
                    </p>
                    <p className="max-w-2xl px-4 mx-auto mt-2 text-sm leading-relaxed text-gray-500 sm:mt-3 sm:text-sm lg:text-base">
                        We offer professional SEO services that help websites increase their organic search score drastically in order to compete for the highest rankings.
                    </p>
                </div>

                {/* CTA Button */}
                <div className={`transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-5 opacity-0 scale-95'}`}>
                    <Link href="/courses" className="relative inline-flex items-center justify-center px-6 py-4 overflow-hidden font-semibold text-white transition-all duration-300 transform rounded-full shadow-lg group hover:shadow-2xl hover:scale-105 active:scale-95">
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800"></span>
                        <span className="absolute inset-0 w-full h-full transition-opacity duration-500 opacity-0 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 group-hover:opacity-100"></span>
                        <span className="absolute inset-0 w-full h-full">
                            <span className="absolute top-0 left-0 w-full h-full transition-transform duration-1000 transform -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 group-hover:translate-x-full"></span>
                        </span>
                        <span className="relative flex items-center gap-2 sm:gap-3">
                            <BookOpen className="w-4 h-4 transition-transform duration-300 transform sm:w-5 sm:h-5 group-hover:rotate-12" />
                            Get My Free Book
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" />
                        </span>
                        <span className="absolute inset-0 bg-blue-400 rounded-xl sm:rounded-2xl animate-ping-slow opacity-20"></span>
                    </Link>
                </div>

                {/* Trust Indicators */}
                <div className={`mt-8 sm:mt-10 lg:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-sm text-gray-500 transform transition-all duration-700 delay-500 
                        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                    <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white rounded-full shadow-sm">
                        <div className="flex -space-x-2">
                            <div className="w-5 h-5 border-2 border-white rounded-full sm:w-6 sm:h-6 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                            <div className="w-5 h-5 border-2 border-white rounded-full sm:w-6 sm:h-6 bg-gradient-to-br from-purple-400 to-purple-600"></div>
                            <div className="w-5 h-5 border-2 border-white rounded-full sm:w-6 sm:h-6 bg-gradient-to-br from-pink-400 to-pink-600"></div>
                        </div>
                        <span className="font-medium">10,000+ Students</span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white rounded-full shadow-sm">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-3 h-3 text-yellow-400 fill-current sm:w-4 sm:h-4" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                            ))}
                        </div>
                        <span className="font-medium">4.9 Rating</span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white rounded-full shadow-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-medium">100% Free</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                }
                33% {
                    transform: translate(30px, -30px) rotate(5deg);
                }
                66% {
                    transform: translate(-20px, 20px) rotate(-5deg);
                }
                }

                @keyframes float-delayed {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                }
                33% {
                    transform: translate(-30px, 30px) rotate(-5deg);
                }
                66% {
                    transform: translate(20px, -20px) rotate(5deg);
                }
                }

                @keyframes pulse-slow {
                0%, 100% {
                    opacity: 0.1;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.15;
                    transform: scale(1.05);
                }
                }

                @keyframes ping-slow {
                0% {
                    transform: scale(1);
                    opacity: 0.8;
                }
                50% {
                    transform: scale(1.05);
                    opacity: 0.4;
                }
                100% {
                    transform: scale(1.1);
                    opacity: 0;
                }
                }

                .animate-float {
                animation: float 20s ease-in-out infinite;
                }

                .animate-float-delayed {
                animation: float-delayed 25s ease-in-out infinite;
                }

                .animate-pulse-slow {
                animation: pulse-slow 4s ease-in-out infinite;
                }

                .animate-ping-slow {
                animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
            `}</style>
        </div>
    );
}