"use client";

import { ArrowRight, Award, ChevronRight, Clock, GraduationCap, Home, Monitor } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutUsPage() {

    const videoSrc = "/assets/videos/aboutus.mp4"; // Set your video path here

    const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});
    const [counters, setCounters] = useState({
        clients: 0,
        years: 0,
        awards: 0,
        satisfaction: 0
    });

    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
    const statsRef = useRef<HTMLElement | null>(null);
    const [statsAnimated, setStatsAnimated] = useState(false);

    const features = [
        {
            icon: <GraduationCap className="object-contain w-8 h-8 text-white transition-transform duration-500 -rotate-45 sm:w-10 sm:h-10 group-hover:scale-110" />,
            title: "Expert Instructors",
            description: "Qualified and certified teachers with international experience"
        },
        {
            icon: <Monitor className="object-contain w-8 h-8 text-white transition-transform duration-500 -rotate-45 sm:w-10 sm:h-10 group-hover:scale-110" />,
            title: "Modern Platform",
            description: "Cutting-edge technology for online learning"
        },
        {
            icon: <Clock className="object-contain w-8 h-8 text-white transition-transform duration-500 -rotate-45 sm:w-10 sm:h-10 group-hover:scale-110" />,
            title: "Flexible Schedule",
            description: "Study anytime, at your own pace and according to your needs"
        },
        {
            icon: <Award className="object-contain w-8 h-8 text-white transition-transform duration-500 -rotate-45 sm:w-10 sm:h-10 group-hover:scale-110" />,
            title: "Recognized Certifications",
            description: "Diplomas and certificates valid at national and European level"
        }
    ];

    // Intersection Observer for section animations
    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        Object.keys(sectionRefs.current).forEach(key => {
            const element = sectionRefs.current[key];
            if (element) {
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            setVisibleSections(prev => ({ ...prev, [key]: true }));
                        }
                    },
                    { threshold: 0.1 }
                );
                observer.observe(element);
                observers.push(observer);
            }
        });

        return () => observers.forEach(observer => observer.disconnect());
    }, []);

    // Counter animation for stats
    useEffect(() => {
        if (!statsRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !statsAnimated) {
                    setStatsAnimated(true);
                    animateCounters();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, [statsAnimated]);

    const animateCounters = () => {
        const duration = 2000;
        const targets = { clients: 38139, years: 35, awards: 12, satisfaction: 100 };
        const steps = 60;
        const interval = duration / steps;

        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;

            setCounters({
                clients: Math.floor(targets.clients * progress),
                years: Math.floor(targets.years * progress),
                awards: Math.floor(targets.awards * progress),
                satisfaction: Math.floor(targets.satisfaction * progress)
            });

            if (step >= steps) {
                setCounters(targets);
                clearInterval(timer);
            }
        }, interval);
    };

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
                                        <span className="font-semibold text-white">About Us</span>
                                    </div>
                                </nav>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight opacity-0 animate-[slideInUp_0.8s_ease-out_0.4s_forwards] leading-tight">
                                    About Us
                                </h1>
                                <p className="max-w-xl text-base lg:text-lg text-gray-300 leading-relaxed opacity-0 animate-[slideInUp_0.8s_ease-out_0.6s_forwards]">
                                    Learn about our driving school, our experienced instructors, and our commitment to excellence.
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

            <section className="py-16 bg-white lg:py-24">
                <div className="px-8 mx-auto max-w-7xl">
                    <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                        <div className="space-y-6">
                            <div>
                                <h2 className="mb-2 text-2xl font-bold text-gray-800 lg:text-4xl">
                                    WHO WE ARE
                                </h2>
                                <div className="w-16 h-1 bg-[#233785] mb-6"></div>
                            </div>
                            <p className="leading-relaxed text-gray-600">
                                Italy UMA Academy is a premier educational institution dedicated to providing top-notch education and training programs in Italy. With a rich history of academic excellence and a commitment to fostering a supportive learning environment, we strive to empower our students to achieve their full potential. Our experienced faculty, state-of-the-art facilities, and comprehensive curriculum are designed to equip students with the skills and knowledge needed to succeed in their chosen fields.
                            </p>
                            <ul className="mt-6 space-y-2 sm:mt-8">
                                {[
                                    "Nullam consequat lacus non luctus finibus",
                                    "Interdum et malesuada fames ac ante",
                                    "Nam justo ipsum, sagittis sed hendrerit ac"
                                ].map((text, idx) => (
                                    <li key={idx} className="flex items-start gap-3 sm:gap-4">
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#233785] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-white sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-base text-gray-700">{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Column - Video */}
                        <div className="relative">
                            <div className="relative overflow-hidden rounded-lg shadow-2xl aspect-video">
                                <video className="object-cover w-full h-full" controls poster="/assets/images/videocover.png">
                                    <source src={videoSrc} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={statsRef} className="py-16 bg-[#333333]">
                <div className="px-8 mx-auto max-w-7xl">
                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                        <div className="text-center text-white">
                            <div className="mb-3">
                                <span className="text-2xl font-semibold text-white lg:text-5xl">
                                    {counters.clients.toLocaleString()}
                                </span>
                            </div>
                            <p className="text-lg font-medium text-gray-300">Happy Clients</p>
                        </div>
                        <div className="text-center text-white">
                            <div className="mb-3">
                                <span className="text-2xl font-semibold text-white lg:text-5xl">
                                    {counters.years}
                                </span>
                            </div>
                            <p className="text-lg font-medium text-gray-300">Years Of Experience</p>
                        </div>
                        <div className="text-center text-white">
                            <div className="mb-3">
                                <span className="text-2xl font-semibold text-white lg:text-5xl">
                                    {counters.awards}
                                </span>
                            </div>
                            <p className="text-lg font-medium text-gray-300">Awards Winning</p>
                        </div>
                        <div className="text-center text-white">
                            <div className="mb-3">
                                <span className="text-2xl font-semibold text-white lg:text-5xl">
                                    {counters.satisfaction}%
                                </span>
                            </div>
                            <p className="text-lg font-medium text-gray-300">Customer Satisfaction</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-white sm:py-16 lg:py-20">
                <div className="px-8 mx-auto max-w-7xl">
                    <div
                        ref={el => { sectionRefs.current['features'] = el; }}
                        className={`transition-all duration-1000 ${visibleSections['features']
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-8'
                            }`}
                    >
                        <h2 className="text-2xl font-bold text-center text-[#233785] mb-2 uppercase sm:text-3xl">
                            Our Features
                        </h2>
                        <div className="flex justify-center mb-16 sm:mb-20 lg:mb-28">
                            <div className="w-16 h-1 rounded-xl bg-[#233785] animate-[expandWidth_1s_ease-out]"></div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    ref={el => { sectionRefs.current[`feature-${index}`] = el; }}
                                    className={`p-6 text-center transition-all mt-10 md:mt-0 duration-700 delay-${index * 100} rounded-sm shadow-md bg-gray-50 hover:shadow-xl hover:-translate-y-2 group ${visibleSections[`feature-${index}`]
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                        }`}
                                >
                                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-8 sm:mb-10 bg-[#233785] rounded-sm rotate-45 -mt-14 transition-all duration-500 group-hover:rotate-[405deg] group-hover:scale-110">
                                        {feature.icon}
                                    </div>
                                    <h3 className="font-bold text-[#233785] mb-2 uppercase text-lg transition-colors duration-300 group-hover:text-blue-700">
                                        {feature.title}
                                    </h3>
                                    <p className="mx-auto text-sm text-gray-600 max-w-[200px]">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section ref={el => { sectionRefs.current['cta'] = el; }} className="relative px-8 py-8 overflow-hidden sm:py-12 bg-gradient-to-r from-blue-900 to-indigo-800" >
                <div className="relative z-10 max-w-6xl mx-auto">
                    <div
                        className={`flex flex-col items-center justify-between gap-6 sm:gap-8 lg:flex-row transition-all duration-1000 ${visibleSections['cta']
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-8'
                            }`}
                    >
                        {/* Left Side - Title */}
                        <div className="flex-1 text-center lg:text-left">
                            <h2 className="mb-2 text-2xl font-bold leading-tight text-white sm:text-2xl lg:text-3xl">
                                Looking for a first-class driving?
                            </h2>
                            <p className="text-blue-100 opacity-90">
                                Get professional driving lessons with certified instructors and start your journey to becoming a confident driver.
                            </p>
                        </div>

                        {/* Right Side - Button */}
                        <div className="flex-shrink-0">
                            <button className="px-6 py-2.5 sm:px-8 sm:py-3 font-semibold text-blue-900 transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:bg-gray-50 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95">
                                Get a Free Quote
                            </button>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute w-32 h-32 bg-blue-400 rounded-full sm:w-40 sm:h-40 -top-8 -right-8 opacity-10 animate-[float_6s_ease-in-out_infinite]"></div>
                    <div className="absolute w-40 h-40 bg-indigo-400 rounded-full sm:w-48 sm:h-48 -bottom-12 -left-12 opacity-10 animate-[float_8s_ease-in-out_infinite_reverse]"></div>
                </div>
            </section>
        </>
    );
}


