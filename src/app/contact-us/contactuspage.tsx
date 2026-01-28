"use client";

import { ArrowRight, ChevronRight, Clock, Home, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from 'react';
import Swal from "sweetalert2";
import { api } from "@/lib/api";

export default function ContactUsPage() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        description: '',
        website: '' // Honeypot field
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [focusedField, setFocusedField] = useState('');

    const sectionRef = useRef(null);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.email || !formData.phone || !formData.description) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fill in all fields',
                confirmButtonColor: '#233785',
            });
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address',
                confirmButtonColor: '#233785',
            });
            return;
        }

        // Phone validation
        if (formData.phone.length < 10) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Phone',
                text: 'Please enter a valid phone number (minimum 10 digits)',
                confirmButtonColor: '#233785',
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await api.contact.submit(formData);

            if (response.success) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Message Sent!',
                    html: `
                        <div style="text-align: left;">
                            <p>${response.message}</p>
                            <div style="margin-top: 15px; padding: 15px; background: #f0f9ff; border-left: 4px solid #233785; border-radius: 5px;">
                                <p style="margin: 0; font-weight: 600; color: #233785;">📧 Confirmation Email Sent</p>
                                <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">
                                    We've sent a confirmation email to <strong>${formData.email}</strong>
                                </p>
                            </div>
                        </div>
                    `,
                    confirmButtonColor: '#233785',
                    confirmButtonText: 'Got it!',
                });
                setFormData({ name: '', email: '', phone: '', description: '', website: '' });
            } else {
                throw new Error(response.message || 'Failed to send message');
            }
        } catch (error: any) {
            console.error('Contact form error:', error);

            let errorMessage = 'An error occurred while sending your message. Please try again.';

            // Handle validation errors
            if (error.response?.data?.errors) {
                const errors = error.response.data.errors;
                const errorMessages = Object.values(errors).flat().join('\n');
                errorMessage = errorMessages;
            } else if (error.message) {
                errorMessage = error.message;
            }

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage,
                confirmButtonColor: '#233785',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const contactInfo = [
        {
            icon: MapPin,
            text: '379 5th Ave New York, NYC 10018',
            link: null,
            delay: 0
        },
        {
            icon: Phone,
            text: '(+1) 96 716 6879',
            link: 'tel:+1967166879',
            delay: 100
        },
        {
            icon: Mail,
            text: 'contact@site.com',
            link: 'mailto:contact@site.com',
            delay: 200
        },
        {
            icon: Clock,
            text: 'Mon-Fri 09:00 - 17:00',
            link: null,
            delay: 300
        }
    ];

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
                                        <span className="font-semibold text-white">Contact Us</span>
                                    </div>
                                </nav>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight opacity-0 animate-[slideInUp_0.8s_ease-out_0.4s_forwards] leading-tight">
                                    Contact Us
                                </h1>
                                <p className="max-w-xl text-base lg:text-lg text-gray-300 leading-relaxed opacity-0 animate-[slideInUp_0.8s_ease-out_0.6s_forwards]">
                                    Get in touch with us for any inquiries, feedback, or to schedule your driving lessons.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-12 sm:h-16 bg-gradient-to-t from-white/80 to-transparent"></div>
            </section>

            <section ref={sectionRef} className="py-12 bg-gray-50 sm:py-16 lg:py-20">
                <div className="px-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12 xl:gap-16">

                        {/* Left Column - Contact Form */}
                        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                            <div className="mb-6 sm:mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
                                    SEND US A MESSAGE
                                </h2>
                                <div className="w-20 h-1 mt-3 bg-[#233785] animate-[expandWidth_1s_ease-out]"></div>
                            </div>

                            <div className="space-y-4 sm:space-y-5">
                                {/* Honeypot field - hidden from real users, visible to bots */}
                                <input
                                    type="text"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    style={{ display: 'none' }}
                                    tabIndex={-1}
                                    autoComplete="off"
                                />

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField('')}
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3  text-gray-700 transition-all duration-300 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#233785] focus:shadow-lg disabled:opacity-50 disabled:cursor-not-wait hover:border-gray-400"
                                        />
                                        <div className={`absolute bottom-0 left-0 h-0.5 bg-[#233785] transition-all duration-300 ${focusedField === 'name' ? 'w-full' : 'w-0'}`}></div>
                                    </div>

                                    <div className="relative group">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField('')}
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3  text-gray-700 transition-all duration-300 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#233785] focus:shadow-lg disabled:opacity-50 disabled:cursor-not-wait hover:border-gray-400"
                                        />
                                        <div className={`absolute bottom-0 left-0 h-0.5 bg-[#233785] transition-all duration-300 ${focusedField === 'email' ? 'w-full' : 'w-0'}`}></div>
                                    </div>
                                </div>

                                {/* Phone Input */}
                                <div className="relative group">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone number"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        onFocus={() => setFocusedField('phone')}
                                        onBlur={() => setFocusedField('')}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3  text-gray-700 transition-all duration-300 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#233785] focus:shadow-lg disabled:opacity-50 disabled:cursor-not-wait hover:border-gray-400"
                                    />
                                    <div className={`absolute bottom-0 left-0 h-0.5 bg-[#233785] transition-all duration-300 ${focusedField === 'phone' ? 'w-full' : 'w-0'}`}></div>
                                </div>

                                {/* Message Textarea */}
                                <div className="relative group">
                                    <textarea
                                        name="description"
                                        placeholder="Your Message"
                                        rows={5}
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        onFocus={() => setFocusedField('description')}
                                        onBlur={() => setFocusedField('')}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3  text-gray-700 transition-all duration-300 bg-white border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:border-[#233785] focus:shadow-lg disabled:opacity-50 disabled:cursor-not-wait hover:border-gray-400"
                                    ></textarea>
                                    <div className={`absolute bottom-0 left-0 h-0.5 bg-[#233785] transition-all duration-300 ${focusedField === 'description' ? 'w-full' : 'w-0'
                                        }`}></div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center pt-2 sm:justify-start">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="relative px-8 py-3 sm:px-10 sm:py-3.5 font-bold text-white transition-all duration-300 bg-[#233785] rounded-lg overflow-hidden group hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 w-full sm:w-auto"
                                    >
                                        <span className="absolute inset-0 w-0 transition-all duration-500 ease-out bg-blue-700 group-hover:w-full"></span>
                                        <span className="relative flex items-center justify-center gap-2">
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Contact Info */}
                        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            <div className="mb-6 sm:mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
                                    CONTACT INFO
                                </h2>
                                <div className="w-20 h-1 mt-3 bg-[#233785] animate-[expandWidth_1s_ease-out_0.3s]"></div>
                            </div>
                            <p className="mb-6 leading-relaxed text-gray-600 sm:mb-8">
                                Feel free to reach out to us using the contact information below. We're here to help and answer any questions you may have.
                            </p>
                            <ul className="space-y-5 sm:space-y-6">
                                {contactInfo.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <li key={index} className={`flex items-start gap-4 group transition-all duration-700 delay-${item.delay} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#233785] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg">
                                                <Icon className="w-5 h-5 text-white sm:w-6 sm:h-6" />
                                            </div>
                                            <div className="flex-1 pt-1.5">
                                                {item.link ? (
                                                    <Link href={item.link} className=" text-gray-700 transition-colors duration-300 hover:text-[#233785] hover:underline">
                                                        {item.text}
                                                    </Link>
                                                ) : (
                                                    <span className="text-gray-700">
                                                        {item.text}
                                                    </span>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>

                            {/* Decorative Card */}
                            <div className="p-6 mt-8 transition-all duration-500 border-2 border-gray-200 sm:mt-10 sm:p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl hover:border-[#233785]">
                                <h3 className="mb-3 text-2xl font-bold text-gray-800">Quick Response</h3>
                                <p className="leading-relaxed text-gray-600">
                                    Our team typically responds within 24 hours during business days. For urgent matters, please call us directly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes expandWidth {
                    from {
                        width: 0;
                    }
                    to {
                        width: 5rem;
                    }
                    }
                `}</style>
            </section>
        </>
    )
}