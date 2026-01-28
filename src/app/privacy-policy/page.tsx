import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Home, } from "lucide-react";

export const metadata: Metadata = {

    title: {
        default: "Privacy Policy | Italy UMA Academy",
        template: "%s | Italy UMA Academy",
    },

    description:
        "Your privacy is important to us. Learn how we protect your data at Italy UMA Academy.",

    alternates: {
        canonical: "https://italyumaacademy.com/privacy-policy",
        languages: {
            en: "https://italyumaacademy.com/privacy-policy",
        },
    },

    keywords: [
        "Privacy Policy",
        "Data Protection",
        "Italy UMA Academy",
        "User Privacy",
        "Personal Information",
        "Data Security",
        "Cookies",
        "GDPR",
    ],

    robots: "index, follow",

    openGraph: {
        title: "Privacy Policy | Italy UMA Academy",
        description: "Your privacy is important to us. Learn how we protect your data at Italy UMA Academy.",
        url: "https://italyumaacademy.com/privacy-policy",
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
        title: "Privacy Policy | Italy UMA Academy",
        description: "Your privacy is important to us. Learn how we protect your data at Italy UMA Academy.",
        images: [
            "https://italyumaacademy.com/assets/logos/logo.png",
        ],
    },
};

export default function PrivacyPolicyPage() {
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
                                        <span className="font-semibold text-white">Privacy Policy</span>
                                    </div>
                                </nav>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight opacity-0 animate-[slideInUp_0.8s_ease-out_0.4s_forwards] leading-tight">
                                    Privacy Policy
                                </h1>
                                <p className="max-w-xl text-base lg:text-lg text-gray-300 leading-relaxed opacity-0 animate-[slideInUp_0.8s_ease-out_0.6s_forwards]">
                                    Your privacy is important to us. Learn how we protect your data.
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
                                Welcome to Italy UMA Academy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our online learning platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                            </p>
                            <p className="leading-relaxed text-gray-700">
                                We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.
                            </p>
                        </section>

                        {/* Information We Collect */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                2. Information We Collect
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-[#1A2E77] mb-3">
                                        2.1 Personal Information
                                    </h3>
                                    <p className="mb-3 leading-relaxed text-gray-700">
                                        We collect information that you voluntarily provide to us when you register on the Platform, enroll in courses, or contact us. This may include:
                                    </p>
                                    <ul className="ml-4 space-y-2 text-gray-700 list-disc list-inside">
                                        <li>Name and contact information (email address, phone number)</li>
                                        <li>Account credentials (username and password)</li>
                                        <li>Payment and billing information</li>
                                        <li>Profile information (profile picture, bio, educational background)</li>
                                        <li>Communication preferences</li>
                                        <li>Course enrollment and progress data</li>
                                        <li>Feedback, comments, and questions submitted to us</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#1A2E77] mb-3">
                                        2.2 Automatically Collected Information
                                    </h3>
                                    <p className="mb-3 leading-relaxed text-gray-700">
                                        When you access our Platform, we automatically collect certain information about your device and usage patterns:
                                    </p>
                                    <ul className="ml-4 space-y-2 text-gray-700 list-disc list-inside">
                                        <li>IP address and geolocation data</li>
                                        <li>Browser type and version</li>
                                        <li>Operating system</li>
                                        <li>Device information (device type, unique device identifiers)</li>
                                        <li>Pages visited and time spent on pages</li>
                                        <li>Referring/exit pages</li>
                                        <li>Date and time stamps</li>
                                        <li>Clickstream data</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#1A2E77] mb-3">
                                        2.3 Cookies and Tracking Technologies
                                    </h3>
                                    <p className="leading-relaxed text-gray-700">
                                        We use cookies, web beacons, and similar tracking technologies to collect information about your browsing activities. Cookies help us remember your preferences, understand how you use our Platform, and improve your experience. You can control cookies through your browser settings, but disabling cookies may affect your ability to use certain features.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* How We Use Your Information */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                3. How We Use Your Information
                            </h2>
                            <p className="mb-3 leading-relaxed text-gray-700">
                                We use the information we collect for various purposes, including:
                            </p>
                            <ul className="ml-4 space-y-2 text-gray-700 list-disc list-inside">
                                <li>Creating and managing your account</li>
                                <li>Processing course enrollments and payments</li>
                                <li>Delivering course content and tracking your progress</li>
                                <li>Providing customer support and responding to inquiries</li>
                                <li>Sending administrative information (account updates, security alerts)</li>
                                <li>Personalizing your learning experience</li>
                                <li>Sending promotional communications about courses, features, and events (with your consent)</li>
                                <li>Analyzing usage patterns to improve our Platform</li>
                                <li>Detecting and preventing fraud, security breaches, and technical issues</li>
                                <li>Complying with legal obligations</li>
                                <li>Conducting research and analytics to enhance our services</li>
                            </ul>
                        </section>

                        {/* Information Sharing */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                4. How We Share Your Information
                            </h2>
                            <p className="mb-3 leading-relaxed text-gray-700">
                                We may share your information in the following circumstances:
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">Service Providers</h3>
                                    <p className="leading-relaxed text-gray-700">
                                        We engage third-party service providers to perform functions on our behalf, such as payment processing, email delivery, hosting services, and analytics. These providers have access to your information only to perform their tasks and are obligated not to disclose or use it for other purposes.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">Course Instructors</h3>
                                    <p className="leading-relaxed text-gray-700">
                                        When you enroll in a course, we may share your name, email, and progress information with the course instructor to facilitate your learning experience and enable instructor-student communication.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">Legal Requirements</h3>
                                    <p className="leading-relaxed text-gray-700">
                                        We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, government agencies, law enforcement).
                                    </p>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">Business Transfers</h3>
                                    <p className="leading-relaxed text-gray-700">
                                        In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change and any choices you may have.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">With Your Consent</h3>
                                    <p className="leading-relaxed text-gray-700">
                                        We may share your information for any other purpose with your explicit consent.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Data Security */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                5. Data Security
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                We implement appropriate technical and organizational security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. These measures include:
                            </p>
                            <ul className="ml-4 space-y-2 text-gray-700 list-disc list-inside">
                                <li>Encryption of sensitive data (SSL/TLS protocols)</li>
                                <li>Secure payment processing through trusted payment gateways</li>
                                <li>Regular security audits and vulnerability assessments</li>
                                <li>Access controls and authentication mechanisms</li>
                                <li>Employee training on data protection practices</li>
                                <li>Backup and disaster recovery procedures</li>
                            </ul>
                            <p className="mt-4 leading-relaxed text-gray-700">
                                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
                            </p>
                        </section>

                        {/* Data Retention */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                6. Data Retention
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it. Account information is typically retained for the duration of your account's active status and for a reasonable period thereafter to comply with legal obligations and resolve disputes.
                            </p>
                        </section>

                        {/* Your Rights */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                7. Your Data Protection Rights
                            </h2>
                            <p className="mb-3 leading-relaxed text-gray-700">
                                Depending on your location, you may have the following rights regarding your personal information:
                            </p>
                            <ul className="ml-4 space-y-2 text-gray-700 list-disc list-inside">
                                <li><strong>Access:</strong> Request access to your personal information and obtain a copy</li>
                                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                                <li><strong>Restriction:</strong> Request restriction of processing your information</li>
                                <li><strong>Portability:</strong> Request transfer of your information to another service provider</li>
                                <li><strong>Objection:</strong> Object to processing of your information for certain purposes</li>
                                <li><strong>Withdraw Consent:</strong> Withdraw your consent at any time (without affecting prior processing)</li>
                            </ul>
                            <p className="mt-4 leading-relaxed text-gray-700">
                                To exercise these rights, please contact us using the information provided below. We will respond to your request within a reasonable timeframe and in accordance with applicable law.
                            </p>
                        </section>

                        {/* Children's Privacy */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                8. Children's Privacy
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                Our Platform is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. If we become aware that we have collected information from a child under 18, we will take steps to delete that information promptly.
                            </p>
                        </section>

                        {/* International Transfers */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                9. International Data Transfers
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                Your information may be transferred to and maintained on servers located outside of your country of residence. By using our Platform, you consent to the transfer of your information to countries that may have different data protection laws than your country. We take appropriate safeguards to ensure your information is protected in accordance with this Privacy Policy.
                            </p>
                        </section>

                        {/* Third-Party Links */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                10. Third-Party Websites and Services
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                Our Platform may contain links to third-party websites and services. We are not responsible for the privacy practices or content of these third parties. We encourage you to read the privacy policies of any third-party sites you visit.
                            </p>
                        </section>

                        {/* California Privacy Rights */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                11. California Privacy Rights (CCPA)
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to delete your information, and the right to opt-out of the sale of your information. Italy UMA Academy does not sell personal information. To exercise your CCPA rights, please contact us.
                            </p>
                        </section>

                        {/* GDPR Compliance */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                12. GDPR Compliance (European Users)
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                If you are located in the European Economic Area (EEA), you have rights under the General Data Protection Regulation (GDPR). We process your information based on legitimate interests, contractual necessity, or your consent. You have the right to lodge a complaint with your local data protection authority if you believe your rights have been violated.
                            </p>
                        </section>

                        {/* Marketing Communications */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                13. Marketing Communications
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                With your consent, we may send you promotional emails about new courses, special offers, and other updates. You can opt-out of marketing communications at any time by clicking the "unsubscribe" link in our emails or by updating your communication preferences in your account settings. Please note that even if you opt-out of marketing emails, we may still send you transactional and administrative messages.
                            </p>
                        </section>

                        {/* Contact Information */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-[#1A2E77] border-b-4 border-[#1a2e77] inline-block pb-2">
                                14. Contact Us
                            </h2>
                            <p className="leading-relaxed text-gray-700">
                                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                            </p>
                            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#F9A134]">
                                <p className="font-semibold text-gray-700">Italy UMA Academy - Data Protection Officer</p>
                                <p className="text-gray-700">Email: privacy@italyumaacademy.com</p>
                                <p className="text-gray-700">Phone: +1 (234) 567-890</p>
                                <p className="text-gray-700">Address: 123 Learning St., Knowledge City, EduState, 45678</p>
                            </div>
                        </section>

                        {/* Acceptance */}
                        <section className="pt-8 space-y-4 border-t-2 border-gray-200">
                            <p className="font-semibold leading-relaxed text-gray-700">
                                By using Italy UMA Academy's Platform, you acknowledge that you have read and understood this Privacy Policy and consent to the collection, use, and disclosure of your information as described herein.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
