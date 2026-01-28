"use client";
import CTA from '@/components/CTA';
import { ArrowLeft, ArrowRight, ChevronRight, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface MainCourse {
    id: number;
    title: string;
    slug: string;
    description: string;
    thumbnail: string | null;
    sub_courses_count: number;
}

interface CoursesPageProps {
    mainCourses: MainCourse[];
}

export default function CoursesPage({ mainCourses }: CoursesPageProps) {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen">
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
                                        <span className="font-semibold text-white">Courses</span>
                                    </div>
                                </nav>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight opacity-0 animate-[slideInUp_0.8s_ease-out_0.4s_forwards] leading-tight">
                                    Courses
                                </h1>
                                <p className="max-w-xl text-base lg:text-lg text-gray-300 leading-relaxed opacity-0 animate-[slideInUp_0.8s_ease-out_0.6s_forwards]">
                                    Discover Italian courses for all levels. Learn with expert teachers, interactive lessons, and cultural insights. Start your journey today!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-12 sm:h-16 bg-gradient-to-t from-white/80 to-transparent"></div>
            </section>

            <section className='bg-white'>
                <div className="px-8 py-10 mx-auto lg:py-20 max-w-7xl">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
                        {mainCourses.map((course) => (
                            <Link
                                key={course.id}
                                href={`/courses/${course.slug}`}
                                className="relative flex flex-col overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-xl group"
                                style={{ minHeight: 300 }}
                            >
                                {course.thumbnail && (
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="absolute inset-0 object-cover w-full h-full"
                                        style={{ minHeight: 300 }}
                                    />
                                )}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                    <h2 className="text-xl font-semibold text-white">{course.title}</h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div >
            </section>

            <CTA />
        </div >
    );
}
