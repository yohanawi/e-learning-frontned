"use client";

import { Home, BookOpen, FileText, Mail, Users, LogIn, UserPlus, User, Shield, FileCheck, MapIcon, CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SitemapPage() {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const sitemapSections = [
        {
            title: "Main Pages",
            icon: Home,
            color: "from-blue-500 to-blue-600",
            links: [
                { name: "Home", url: "/", description: "Welcome to Italy UMA Academy", icon: Home },
                { name: "About Us", url: "/about-us", description: "Learn about our mission and values", icon: Users },
                { name: "Contact Us", url: "/contact-us", description: "Get in touch with our team", icon: Mail },
            ]
        },
        {
            title: "Learning",
            icon: BookOpen,
            color: "from-blue-500 to-blue-600",
            links: [
                { name: "Courses", url: "/courses", description: "Explore our video-based courses", icon: BookOpen },
                { name: "Blogs", url: "/blogs", description: "Read latest educational articles", icon: FileText },
            ]
        },
        {
            title: "Account",
            icon: User,
            color: "from-blue-500 to-blue-600",
            links: [
                { name: "Login", url: "/login", description: "Access your account", icon: LogIn },
                { name: "Register", url: "/register", description: "Create a new account", icon: UserPlus },
                { name: "My Account", url: "/my-account", description: "Manage your profile and courses", icon: User },
            ]
        },
        {
            title: "Legal & Information",
            icon: Shield,
            color: "from-blue-500 to-blue-600",
            links: [
                { name: "Terms & Conditions", url: "/terms-and-conditions", description: "Our terms of service", icon: FileCheck },
                { name: "Privacy Policy", url: "/privacy-policy", description: "How we protect your data", icon: Shield },
                { name: "Sitemap", url: "/sitemap", description: "Navigate our website", icon: MapIcon },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            <section className="relative h-[40vh] md:h-[60vh] min-h-[400px] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <Image src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=1080&fit=crop"
                        alt="About Us Hero Background" width={1920} height={1080} className="w-full h-full object-cover opacity-30 animate-[zoomIn_20s_ease-in-out_infinite_alternate]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>
                </div>
                <div className="relative z-10 flex items-center h-full">
                    <div className="w-full px-8 mx-auto max-w-7xl">
                        <div className="flex flex-col gap-6 lg:gap-8 lg:flex-row lg:justify-between lg:items-center">
                            <div className="space-y-4 text-white">
                                <nav className="flex items-center gap-2 opacity-0 animate-[slideInLeft_0.6s_ease-out_0.2s_forwards]">
                                    <Home className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                        <Link href="/" className="relative flex items-center gap-1 text-gray-300 transition-all duration-300 hover:text-white group">
                                            Home
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                        </Link>
                                        <ChevronRight className="flex-shrink-0 w-4 h-4 text-gray-400 sm:w-5 sm:h-5" />
                                        <span className="font-semibold text-white">Sitemap</span>
                                    </div>
                                </nav>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight opacity-0 animate-[slideInUp_0.8s_ease-out_0.4s_forwards] leading-tight">
                                    Sitemap
                                </h1>
                                <p className="max-w-xl text-base lg:text-lg text-gray-300 leading-relaxed opacity-0 animate-[slideInUp_0.8s_ease-out_0.6s_forwards]">
                                    Navigate through all sections of Italy UMA Academy with ease using our comprehensive sitemap.
                                </p>
                            </div>
                            <div className="opacity-0 animate-[slideInRight_0.8s_ease-out_0.8s_forwards]">
                                <Link href="/contact-us" className="group inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#233785] text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 whitespace-nowrap">
                                    Get in Touch
                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 sm:w-5 sm:h-5 group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-12 sm:h-16 bg-gradient-to-t from-white/80 to-transparent"></div>
            </section>

            {/* Content Section */}
            <div className="px-8 py-12 mx-auto max-w-7xl md:py-16">
                {/* Introduction */}
                <div className="mb-12 text-center">
                    <p className="max-w-2xl mx-auto text-gray-600 md:text-lg">
                        Find everything you need quickly and easily. Explore all pages and sections of our learning platform.
                    </p>
                </div>

                {/* Sitemap Grid */}
                <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2">
                    {sitemapSections.map((section, sectionIndex) => {
                        const SectionIcon = section.icon;
                        return (
                            <div
                                key={sectionIndex}
                                className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-2xl"
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${sectionIndex * 100}ms forwards`,
                                    opacity: 0,
                                }}
                            >
                                {/* Section Header */}
                                <div className={`bg-gradient-to-r ${section.color} p-6 relative overflow-hidden`}>
                                    <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 rounded-full bg-white/10"></div>
                                    <div className="relative z-10 flex items-center gap-4">
                                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                            <SectionIcon className="w-8 h-8 text-white" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                                    </div>
                                </div>

                                {/* Section Links */}
                                <div className="p-6 space-y-3">
                                    {section.links.map((link, linkIndex) => {
                                        const LinkIcon = link.icon;
                                        const cardKey = `${sectionIndex}-${linkIndex}`;
                                        return (
                                            <Link
                                                key={linkIndex}
                                                href={link.url}
                                                className="block group"
                                                onMouseEnter={() => setHoveredCard(cardKey)}
                                                onMouseLeave={() => setHoveredCard(null)}
                                            >
                                                <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${hoveredCard === cardKey
                                                    ? 'border-[#F9A134] bg-gradient-to-r from-orange-50 to-yellow-50 shadow-md transform scale-105'
                                                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                                                    }`}>
                                                    <div className="flex items-start gap-4">
                                                        <div className={`p-2 rounded-lg transition-all duration-300 ${hoveredCard === cardKey
                                                            ? 'bg-[#F9A134] shadow-lg'
                                                            : 'bg-white'
                                                            }`}>
                                                            <LinkIcon className={`w-5 h-5 transition-colors duration-300 ${hoveredCard === cardKey ? 'text-white' : 'text-gray-600'
                                                                }`} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className={`font-semibold mb-1 transition-colors duration-300 flex items-center gap-2 ${hoveredCard === cardKey ? 'text-[#1A2E77]' : 'text-gray-800'
                                                                }`}>
                                                                {link.name}
                                                                {hoveredCard === cardKey && (
                                                                    <CheckCircle2 className="w-4 h-4 text-[#F9A134] animate-bounce" />
                                                                )}
                                                            </h3>
                                                            <p className="text-sm text-gray-600">{link.description}</p>
                                                        </div>
                                                        <div className={`mt-1 transition-transform duration-300 ${hoveredCard === cardKey ? 'translate-x-2' : ''
                                                            }`}>
                                                            <svg
                                                                className={`w-5 h-5 transition-colors duration-300 ${hoveredCard === cardKey ? 'text-[#F9A134]' : 'text-gray-400'
                                                                    }`}
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Additional Information */}
                <div className="bg-gradient-to-r from-[#1A2E77] to-[#142254] rounded-2xl shadow-xl p-8 md:p-12 text-white">
                    <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
                        <div className="space-y-3">
                            <div className="inline-flex items-center justify-center w-16 h-16 mx-auto border-2 rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                                <BookOpen className="w-8 h-8 text-[#F9A134]" />
                            </div>
                            <h3 className="text-xl font-bold">Quality Courses</h3>
                            <p className="text-gray-300">
                                Access video-based learning content designed by experts
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div className="inline-flex items-center justify-center w-16 h-16 mx-auto border-2 rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                                <Users className="w-8 h-8 text-[#F9A134]" />
                            </div>
                            <h3 className="text-xl font-bold">Expert Instructors</h3>
                            <p className="text-gray-300">
                                Learn from experienced professionals in their fields
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div className="inline-flex items-center justify-center w-16 h-16 mx-auto border-2 rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                                <Shield className="w-8 h-8 text-[#F9A134]" />
                            </div>
                            <h3 className="text-xl font-bold">Secure Platform</h3>
                            <p className="text-gray-300">
                                Your data and privacy are protected with industry-standard security
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-6 mt-12 md:grid-cols-4">
                    {[
                        { number: "100+", label: "Courses", color: "from-blue-500 to-blue-600" },
                        { number: "1000+", label: "Students", color: "from-purple-500 to-purple-600" },
                        { number: "50+", label: "Instructors", color: "from-green-500 to-green-600" },
                        { number: "24/7", label: "Support", color: "from-orange-500 to-orange-600" }
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="p-6 text-center transition-all duration-300 transform bg-white border border-gray-100 shadow-lg rounded-xl hover:scale-105"
                        >
                            <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                                {stat.number}
                            </div>
                            <div className="font-medium text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-12 text-center">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-[#F9A134]/20">
                        <h3 className="text-2xl font-bold text-[#1A2E77] mb-4">
                            Ready to Start Learning?
                        </h3>
                        <p className="max-w-2xl mx-auto mb-6 text-gray-600">
                            Join thousands of students learning at their own pace with our video-based courses
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Link
                                href="/courses"
                                className="px-8 py-4 bg-gradient-to-r from-[#F9A134] to-[#e8912a] text-white rounded-lg font-semibold hover:from-[#e8912a] hover:to-[#d4882e] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Browse Courses
                            </Link>
                            <Link
                                href="/register"
                                className="px-8 py-4 bg-gradient-to-r from-[#1A2E77] to-[#142254] text-white rounded-lg font-semibold hover:from-[#142254] hover:to-[#0d1640] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
