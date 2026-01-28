import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Home, } from "lucide-react";

export const metadata: Metadata = {
    title: {
        default: "Terms and Conditions | Italy UMA Academy",
        template: "%s | Italy UMA Academy",
    },

    description:
        "Read the terms and conditions of Italy UMA Academy, outlining the rules and guidelines for using our educational platform.",

    alternates: {
        canonical: "https://italyumaacademy.com/terms-and-conditions",
        languages: {
            en: "https://italyumaacademy.com/terms-and-conditions",
        },
    },

    keywords: [
        "Italy UMA Academy",
        "Terms and Conditions",
        "User Agreement",
        "Legal Terms",
        "Online Learning",
        "Education Platform",
    ],

    robots: "index, follow",

    openGraph: {
        title: "Terms and Conditions | Italy UMA Academy",
        description: "Read the terms and conditions of Italy UMA Academy, outlining the rules and guidelines for using our educational platform.",
        url: "https://italyumaacademy.com/terms-and-conditions",
        type: "website",
        images: [
            {
                url: "https://italyumaacademy.com/assets/logos/logo.png",
                width: 1200,
                height: 630,
                alt: "Italy UMA Academy",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        site: "@italyumaacademy",
        title: "Terms and Conditions | Italy UMA Academy",
        description: "Read the terms and conditions of Italy UMA Academy, outlining the rules and guidelines for using our educational platform.",
        images: [
            "https://italyumaacademy.com/assets/logos/logo.png",
        ],
    },
};

export default function TermsAndConditionsPage() {
    return (
        <>
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
                                        <span className="font-semibold text-white">Terms and Conditions</span>
                                    </div>
                                </nav>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight opacity-0 animate-[slideInUp_0.8s_ease-out_0.4s_forwards] leading-tight">
                                    Terms and Conditions
                                </h1>
                                <p className="max-w-xl text-base lg:text-lg text-gray-300 leading-relaxed opacity-0 animate-[slideInUp_0.8s_ease-out_0.6s_forwards]">
                                    Read the terms and conditions of Italy UMA Academy, outlining the rules and guidelines for using our educational platform.
                                </p>
                                <p className="mt-4 text-sm text-gray-300">
                                    Last Updated: January 22, 2026
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-12 sm:h-16 bg-gradient-to-t from-white/80 to-transparent"></div>
            </section>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-5xl px-8 py-12 mx-auto sm:px-6 lg:px-8 md:py-16">
                    <div className="p-8 space-y-8 bg-white shadow-xl rounded-2xl md:p-12">
                        {/* Introduction */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                1. Introduction
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                Welcome to Italy UMA Academy. These Terms and Conditions ("Terms") govern your access to and use of our website, mobile applications, and online learning platform (collectively, the "Platform"). By accessing or using our Platform, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Platform.
                            </p>
                            <p className="leading-relaxed text-gray-700">
                                Italy UMA Academy reserves the right to modify these Terms at any time. We will notify you of any material changes by posting the new Terms on our Platform. Your continued use of the Platform after such changes constitutes your acceptance of the new Terms.
                            </p>
                        </section>

                        {/* Account Registration */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                2. Account Registration
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                To access certain features of our Platform, you must create an account. You agree to:
                            </p>
                            <ul className="ml-4 space-y-2 text-gray-700 list-disc list-inside">
                                <li>Provide accurate, current, and complete information during registration</li>
                                <li>Maintain and promptly update your account information</li>
                                <li>Keep your password secure and confidential</li>
                                <li>Notify us immediately of any unauthorized use of your account</li>
                                <li>Be responsible for all activities that occur under your account</li>
                                <li>Be at least 18 years old or have parental/guardian consent</li>
                            </ul>
                            <p className="leading-relaxed text-gray-700">
                                Italy UMA Academy reserves the right to suspend or terminate your account if we believe you have violated these Terms or engaged in fraudulent or illegal activities.
                            </p>
                        </section>

                        {/* Course Access and Licenses */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                3. Course Access and Licenses
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                When you enroll in a course, Italy UMA Academy grants you a limited, non-exclusive, non-transferable license to access and view the course content for personal, non-commercial use. You agree not to:
                            </p>
                            <ul className="ml-4 space-y-2 text-gray-700 list-disc list-inside">
                                <li>Share your account credentials with others</li>
                                <li>Download, copy, or distribute course materials without permission</li>
                                <li>Use course content for commercial purposes</li>
                                <li>Modify, reverse engineer, or create derivative works from course content</li>
                                <li>Remove any copyright or proprietary notices from course materials</li>
                            </ul>
                            <p className="leading-relaxed text-gray-700">
                                Course access may be subject to time limitations or content unlocking based on progression, as specified in the course details.
                            </p>
                        </section>

                        {/* Payment and Refunds */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                4. Payment and Refunds
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                All course fees are displayed in the applicable currency and are subject to change. Payment terms include:
                            </p>
                            <ul className="ml-4 space-y-2 text-gray-700 list-disc list-inside">
                                <li>Payment is required before accessing paid course content</li>
                                <li>All prices are subject to applicable taxes</li>
                                <li>We accept payment through secure payment gateways</li>
                                <li>Refund requests must be submitted within 14 days of purchase</li>
                                <li>Refunds are available only if less than 25% of course content has been accessed</li>
                                <li>Promotional pricing may have different refund terms</li>
                                <li>Processing fees may apply to refunded transactions</li>
                            </ul>
                            <p className="leading-relaxed text-gray-700">
                                Italy UMA Academy reserves the right to modify course prices at any time, but price changes will not affect courses already purchased.
                            </p>
                        </section>

                        {/* User Conduct */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                5. User Conduct
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                You agree to use the Platform in compliance with all applicable laws and regulations. You must not:
                            </p>
                            <ul className="ml-4 space-y-2 text-gray-700 list-disc list-inside">
                                <li>Post or transmit any unlawful, threatening, abusive, defamatory, or obscene content</li>
                                <li>Harass, intimidate, or harm other users or instructors</li>
                                <li>Impersonate any person or entity</li>
                                <li>Interfere with or disrupt the Platform or servers</li>
                                <li>Attempt to gain unauthorized access to any part of the Platform</li>
                                <li>Use automated systems or software to extract data from the Platform</li>
                                <li>Post spam, advertisements, or promotional content without permission</li>
                            </ul>
                        </section>

                        {/* Intellectual Property */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                6. Intellectual Property Rights
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                All content on the Platform, including but not limited to text, graphics, logos, images, videos, audio clips, and software, is the property of Italy UMA Academy or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws.
                            </p>
                            <p className="leading-relaxed text-gray-700">
                                You retain ownership of any content you submit to the Platform (such as comments or feedback), but you grant Italy UMA Academy a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content for the purpose of operating and improving the Platform.
                            </p>
                        </section>

                        {/* Privacy and Data Protection */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                7. Privacy and Data Protection
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using the Platform, you consent to our collection and use of personal information as described in our Privacy Policy.
                            </p>
                            <p className="leading-relaxed text-gray-700">
                                We implement appropriate security measures to protect your data, but we cannot guarantee absolute security. You are responsible for maintaining the confidentiality of your account credentials.
                            </p>
                        </section>

                        {/* Third-Party Links and Services */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                8. Third-Party Links and Services
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                Our Platform may contain links to third-party websites or services that are not owned or controlled by Italy UMA Academy. We are not responsible for the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that Italy UMA Academy shall not be liable for any damage or loss caused by your use of any third-party content or services.
                            </p>
                        </section>

                        {/* Disclaimers and Limitations */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                9. Disclaimers and Limitations of Liability
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                THE PLATFORM AND ALL CONTENT ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. ITALY UMA ACADEMY DOES NOT WARRANT THAT:
                            </p>
                            <ul className="ml-4 space-y-2 text-gray-700 list-disc list-inside">
                                <li>The Platform will be uninterrupted, secure, or error-free</li>
                                <li>The results obtained from using the Platform will be accurate or reliable</li>
                                <li>Course content will meet your specific requirements or expectations</li>
                                <li>Any errors in the Platform will be corrected</li>
                            </ul>
                            <p className="leading-relaxed text-gray-700">
                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ITALY UMA ACADEMY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE PLATFORM.
                            </p>
                        </section>

                        {/* Termination */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                10. Termination
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                Italy UMA Academy may terminate or suspend your account and access to the Platform immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Platform will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
                            </p>
                        </section>

                        {/* Governing Law */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                11. Governing Law and Jurisdiction
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                These Terms shall be governed by and construed in accordance with the laws of Italy, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of the courts of Italy.
                            </p>
                        </section>

                        {/* Contact Information */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                12. Contact Us
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                If you have any questions about these Terms and Conditions, please contact us at:
                            </p>
                            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#1a2e77]">
                                <p className="font-semibold text-gray-700">Italy UMA Academy</p>
                                <p className="text-gray-700">Email: legal@italyumaacademy.com</p>
                                <p className="text-gray-700">Phone: +1 (234) 567-890</p>
                                <p className="text-gray-700">Address: 123 Learning St., Knowledge City, EduState, 45678</p>
                            </div>
                        </section>

                        {/* Acceptance */}
                        <section className="pt-8 space-y-4 border-t-2 border-gray-200">
                            <p className="font-semibold leading-relaxed text-gray-700">
                                By using Italy UMA Academy's Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
