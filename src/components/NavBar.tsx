"use client";

import { Mail, Phone, Menu, X } from "lucide-react";
import ExpandableSearch from "./ExpandableSearch";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';

export default function NavBar() {

    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuItems = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about-us' },
        { name: 'Courses', href: '/courses' },
        { name: 'Contact Us', href: '/contact-us' },
    ];

    return (
        <header>
            <div className="bg-[#1A2E77] text-white text-sm">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center mx-auto gap-28 lg:gap-6 md:mx-0 md:justify-start">
                        <div className="relative flex items-center gap-1 transition group hover:text-gray-300">
                            <Phone className="w-4 h-4 mt-0.5 group-hover:text-gray-300" />
                            <Link href="tel:+1234567890" className="relative">+1 (234) 567-890</Link>
                            <span className="absolute left-1/2 bottom-0 w-0 h-[1px] bg-gray-300 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                        </div>
                        <div className="relative flex items-center gap-1 transition group hover:text-gray-300">
                            <Mail className="w-4 h-4 mt-0.5 group-hover:text-gray-300" />
                            <Link href="mailto:example@example.com" className="relative">example@example.com</Link>
                            <span className="absolute left-1/2 bottom-0 w-0 h-[1px] bg-gray-300 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                        </div>
                    </div>

                    <div className="items-center hidden gap-5 md:flex">
                        <div className="flex items-center gap-5">
                            <Link href="/#" className="relative hover:no-underline group">
                                Purchase Now
                                <span className="absolute left-1/2 bottom-0 w-0 h-[1px] bg-gray-300 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                            </Link>
                            <Link href="/#" className="relative hover:no-underline group">
                                News
                                <span className="absolute left-1/2 bottom-0 w-0 h-[1px] bg-gray-300 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-1">
                            <ExpandableSearch layout="push" inputWidthClass="w-60" />
                        </div>
                    </div>
                </div>
            </div>
            <nav className="sticky top-0 z-50 bg-white shadow-md">
                <div className="px-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 animate-fadeIn">
                            <Link href="/" className="flex items-center group">
                                <div className="flex items-center justify-center w-16 h-16 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                                    <Image
                                        src="/assets/images/logos/logo.png"
                                        alt="Italy UMA Academy Logo"
                                        width={300}
                                        height={300}
                                        className="object-contain"
                                    />
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="items-center hidden space-x-1 md:flex">
                            {menuItems.map((item, index) => (
                                <Link key={item.name} href={item.href}
                                    className="relative px-4 py-2 overflow-hidden font-medium text-gray-700 transition-all duration-300 rounded-lg hover:text-blue-600 group"
                                    style={{ animationDelay: `${index * 100}ms` }}>
                                    <span className="relative z-10">{item.name}</span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </Link>
                            ))}

                            {user ? (
                                <Link href="/my-account" className="relative px-4 py-2 overflow-hidden font-medium text-gray-700 transition-all duration-300 rounded-lg hover:text-blue-600 group">
                                    <span className="relative z-10">My Account</span>
                                    <span className="absolute inset-0 transition-transform duration-300 origin-left transform scale-x-0 rounded-lg bg-blue-50 group-hover:scale-x-100"></span>
                                </Link>
                            ) : (
                                <div className="flex items-center ml-2 space-x-2">
                                    <Link href="/login" className="px-4 py-2 font-medium text-gray-700 transition-all duration-300 rounded-lg hover:text-blue-600 hover:bg-blue-50">
                                        Login
                                    </Link>
                                    <Link href="/register" className="px-6 py-2.5 text-white font-medium bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-105 hover:from-blue-700 hover:to-blue-800">
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={toggleMenu} aria-label="Toggle menu"
                                className="p-2 text-gray-700 transition-all duration-300 transform rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:scale-110">
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-8 pt-2 pb-4 space-y-2 border-t border-gray-200 bg-gray-50">
                        {menuItems.map((item, index) => (
                            <Link key={item.name} href={item.href}
                                className="block px-4 py-3 font-medium text-gray-700 transition-all duration-300 transform rounded-lg hover:bg-blue-600 hover:text-white hover:pl-6"
                                style={{
                                    animation: isOpen ? `slideIn 0.3s ease-out ${index * 50}ms forwards` : 'none',
                                    opacity: isOpen ? 1 : 0
                                }}>
                                {item.name}
                            </Link>
                        ))}
                        <hr className="my-2" />
                        {user ? (
                            <Link href="/my-account" className="block px-4 py-3 font-medium text-gray-700 transition-all duration-300 rounded-lg hover:bg-blue-600 hover:text-white hover:pl-6">
                                My Account
                            </Link>
                        ) : (
                            <div className="flex flex-row items-center px-4 pt-2 mx-auto space-x-2">
                                <Link href="/login" className="block px-16 py-3 font-medium text-center text-gray-700 transition-all duration-300 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white">
                                    Login
                                </Link>
                                <Link href="/register" className="block px-16 py-3 font-medium text-center text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-xl hover:from-blue-700 hover:to-blue-800">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}