"use client";

import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 200);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-50 px-2 py-2 rounded-md bg-[#1d4dd5] text-white shadow-lg transition-opacity duration-300 hover:bg-[#1541a3] focus:outline-none ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-label="Scroll to top">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
}
