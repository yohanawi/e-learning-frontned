"use client";

import { ChevronsRight, Facebook, Instagram, Linkedin, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { subscribeNewsletter } from "@/app/actions/newsletter";

function SubscribeButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#F9A134] to-[#e8912a] rounded-r-lg hover:from-[#e8912a] hover:to-[#d4882e] focus:outline-none focus:ring-2 focus:ring-[#F9A134] focus:ring-offset-2 focus:ring-offset-[#1A2E77] disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl min-w-[120px] flex items-center justify-center"
        >
            {pending ? (
                <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
            ) : (
                "Subscribe"
            )}
        </button>
    );
}

export default function Footer() {
    const [email, setEmail] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const [state, formAction] = useFormState(subscribeNewsletter, {
        ok: false,
        message: "",
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const footer = document.getElementById("footer");
        if (footer) observer.observe(footer);

        return () => {
            if (footer) observer.unobserve(footer);
        };
    }, []);

    useEffect(() => {
        if (state.ok) {
            setEmail("");
        }
    }, [state.ok]);

    const quickLinks = ["Home", "About Us", "Courses", "Contact Us", "Blogs", "Sitemap"];

    const socialLinks = [
        { Icon: Facebook, colorClass: "hover:bg-blue-600", url: "https://www.facebook.com/yourpage" },
        { Icon: Instagram, colorClass: "hover:bg-pink-500", url: "https://www.instagram.com/yourprofile" },
        { Icon: Linkedin, colorClass: "hover:bg-blue-700", url: "https://www.linkedin.com/yourprofile" },
    ];

    return (
        <footer id="footer" className="bg-gradient-to-br from-[#1A2E77] to-[#142254] relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 bg-white rounded-full w-72 h-72 blur-3xl animate-float"></div>
                <div className="absolute bottom-0 right-0 bg-white rounded-full w-96 h-96 blur-3xl animate-float-delayed"></div>
            </div>

            <div className="relative z-10">
                <div className="max-w-screen-xl px-8 py-12 mx-auto sm:px-6 lg:px-8 lg:py-16">
                    <div className="grid grid-cols-1 gap-8 pb-12 border-b-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12 border-white/20">
                        <div className={`transform transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                            style={{ transitionDelay: "0ms" }}>
                            <div className="relative w-32 h-16 mb-16 group">
                                <div className="relative p-2 transition-transform duration-300 transform group-hover:scale-105">
                                    <div className="flex items-center justify-center h-full">
                                        <Image src="/assets/images/logos/logo.png" alt="Italy UMA Academy Logo" width={128} height={64} className="w-full h-auto" />
                                    </div>
                                </div>
                            </div>

                            <p className="mb-6 leading-relaxed text-gray-200 md:max-w-xs">
                                Italy UMA Academy is a premier online learning platform dedicated to providing high-quality, video-based courses that empower learners to achieve their educational goals at their own pace.
                            </p>

                            <ul className="space-y-6">
                                <li className="flex items-start text-gray-200 cursor-pointer group">
                                    <PhoneCall className="w-5 h-5 mr-3 mt-0.5 text-white transition-all duration-300 transform group-hover:text-[#F9A134] group-hover:scale-110 group-hover:rotate-12" />
                                    <a href="tel:+1234567890" className="transition-colors duration-300 group-hover:text-[#F9A134]">
                                        +1 (234) 567-890
                                    </a>
                                </li>
                                <li className="flex items-start text-gray-200 cursor-pointer group">
                                    <MapPin className="w-7 h-7 mr-3 mt-0.5 text-white transition-all duration-300 transform group-hover:scale-110 group-hover:bounce group-hover:text-[#F9A134]" />
                                    <span className="transition-colors duration-300 group-hover:text-[#F9A134]">
                                        123 Learning St., Knowledge City, EduState, 45678
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Quick Links Column */}
                        <div className={`transform transition-all duration-700 sm:col-span-1 lg:col-span-1 md:ms-20`}
                            style={{
                                transitionDelay: "150ms",
                                transform: isVisible ? "translateY(0)" : "translateY(10px)",
                                opacity: isVisible ? 1 : 0
                            }}>
                            <h4 className="relative inline-block mb-6 text-2xl font-bold tracking-wider text-white uppercase">
                                Quick Links
                                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#F9A134] rounded-full"></span>
                            </h4>
                            <ul className="grid grid-cols-1 gap-3">
                                {quickLinks.map((item, index) => (
                                    <li key={item} className="group"
                                        style={{
                                            animation: isVisible ? `slideInLeft 0.5s ease-out ${index * 100}ms forwards` : "none",
                                            opacity: isVisible ? 1 : 0
                                        }}>
                                        <Link href={`/${item.toLowerCase().replace(/\s/g, "-")}`} className="flex items-center text-gray-200 transition-all duration-300 hover:text-[#F9A134] hover:translate-x-2">
                                            <ChevronsRight className="w-4 h-4 mr-2 text-[#F9A134] transition-transform duration-300 group-hover:translate-x-1" />
                                            <span>{item}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter Column */}
                        <div className={`sm:col-span-1 lg:col-span-1 transform transition-all duration-700`}
                            style={{
                                transitionDelay: "300ms",
                                transform: isVisible ? "translateY(0)" : "translateY(10px)",
                                opacity: isVisible ? 1 : 0
                            }}>
                            <div className="max-w-md">
                                <h4 className="relative inline-block mb-6 text-2xl font-bold tracking-wider text-white uppercase">
                                    Newsletter
                                    <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#F9A134] rounded-full"></span>
                                </h4>
                                <p className="mb-6 leading-relaxed text-gray-200">
                                    Don't miss anything, sign up now and keep informed about our company.
                                </p>

                                <div className="mb-8">
                                    <form action={formAction} className="flex flex-col gap-2">
                                        <div className="flex flex-row">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="flex-1 px-4 py-3 text-gray-900 bg-white/90 backdrop-blur-sm border-2 border-transparent rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#F9A134] focus:border-[#F9A134] transition-all duration-300 placeholder:text-gray-500"
                                                required
                                            />
                                            <SubscribeButton />
                                        </div>

                                        {state.message ? (
                                            <p className={`text-sm ${state.ok ? 'text-green-200' : 'text-red-200'}`}>
                                                {state.message}
                                            </p>
                                        ) : null}
                                    </form>
                                </div>

                                {/* Social Media */}
                                <div>
                                    <h4 className="relative inline-block mb-6 text-2xl font-bold tracking-wider text-white uppercase">Follow Us
                                        <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#F9A134] rounded-full"></span>
                                    </h4>

                                    <div className="flex items-center gap-4">
                                        {socialLinks.map(({ Icon, colorClass, url }, index) => (
                                            <Link key={index} href={url} target="_blank" rel="noopener noreferrer"
                                                className={`flex items-center justify-center w-10 h-10 text-white bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full transition-all duration-300 transform hover:scale-110 hover:border-transparent ${colorClass} hover:shadow-lg`}
                                                style={{
                                                    animation: isVisible ? `scaleIn 0.5s ease-out ${index * 100}ms forwards` : "none",
                                                    opacity: isVisible ? 1 : 0,
                                                    transform: isVisible ? "scale(1)" : "scale(0)"
                                                }}>
                                                <Icon className="w-5 h-5" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className={`pt-8 transform transition-all duration-700`}
                        style={{
                            transitionDelay: "450ms",
                            transform: isVisible ? "translateY(0)" : "translateY(10px)",
                            opacity: isVisible ? 1 : 0
                        }}>
                        <div className="flex flex-col items-center justify-between gap-4 text-gray-200 md:flex-row">
                            <p className="text-center md:text-left">
                                &copy; {new Date().getFullYear()}{" "}
                                <Link href="/" className="text-[#F9A134] hover:text-[#e8912a] transition-colors duration-300 font-semibold">
                                    Italy UMA Academy
                                </Link>
                                . Created by CodeBean Team.
                            </p>
                            <div className="flex items-center gap-4">
                                <Link href="/terms-and-conditions" className="hover:text-[#F9A134] transition-all duration-300 hover:underline underline-offset-4">
                                    Terms & Conditions
                                </Link>
                                <span className="text-white/30">|</span>
                                <Link href="/privacy-policy" className="hover:text-[#F9A134] transition-all duration-300 hover:underline underline-offset-4">
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }

                .animate-float-delayed {
                animation: float-delayed 10s ease-in-out infinite;
                }

                .group:hover .group-hover\\:bounce {
                animation: bounce 0.6s ease-in-out;
                }
            `}</style>
        </footer>
    );
}