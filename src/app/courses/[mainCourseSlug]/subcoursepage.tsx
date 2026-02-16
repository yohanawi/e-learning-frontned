'use client';

import { useEffect, useState } from 'react';
import { api, MainCourseDetail, SubCourse } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import CTA from '@/components/CTA';
import { ArrowLeft, BookOpen, Clock, Star, Users, ChevronRight, Home } from 'lucide-react';

export default function MainCourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.mainCourseSlug as string;

    const [mainCourse, setMainCourse] = useState<MainCourseDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(true); // true = grid view, false = list view
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (slug) {
            loadMainCourse();
        }
    }, [slug]);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const loadMainCourse = async () => {
        try {
            const response = await api.courses.getMainCourse(slug);
            setMainCourse(response.data);
        } catch (error) {
            console.error('Failed to load main course:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!mainCourse) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Course not found</h2>
                    <Link href="/courses" className="text-blue-600 hover:underline">
                        ← Back to all courses
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Header with Banner */}
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
                                        <Link href="/courses" className="relative flex items-center gap-1 text-gray-300 transition-all duration-300 hover:text-white group">
                                            Courses
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                        </Link>
                                        <ChevronRight className="flex-shrink-0 w-4 h-4 text-gray-400 sm:w-5 sm:h-5" />
                                        <span className="font-semibold text-white">{mainCourse.title}</span>
                                    </div>
                                </nav>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight opacity-0 animate-[slideInUp_0.8s_ease-out_0.4s_forwards] leading-tight">
                                    {mainCourse.title}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-12 sm:h-16 bg-gradient-to-t from-white/80 to-transparent"></div>
            </section>

            {/* Search Bar */}
            <section className="py-8 bg-gray-50">
                <div className="grid grid-cols-1 gap-6 mx-auto shadow-sm max-w-7xl sm:grid-cols-12 ">
                    {/* Left column: 8/12 */}
                    <div className="w-full p-3 bg-white sm:col-span-9">
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                            <div className="flex items-center gap-5 font-medium text-black">
                                <div className="inline-flex items-center space-x-2">
                                    <button
                                        type="button"
                                        className={`p-2 rounded ${isVisible ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} transition-colors`}
                                        aria-label="Grid view"
                                        onClick={() => setIsVisible(true)}
                                        title="Grid view"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <rect x="3" y="3" width="7" height="7" rx="2" />
                                            <rect x="14" y="3" width="7" height="7" rx="2" />
                                            <rect x="14" y="14" width="7" height="7" rx="2" />
                                            <rect x="3" y="14" width="7" height="7" rx="2" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        className={`p-2 rounded ${!isVisible ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} transition-colors`}
                                        aria-label="List view"
                                        onClick={() => setIsVisible(false)}
                                        title="List view"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <rect x="4" y="5" width="16" height="3" rx="1.5" />
                                            <rect x="4" y="10.5" width="16" height="3" rx="1.5" />
                                            <rect x="4" y="16" width="16" height="3" rx="1.5" />
                                        </svg>
                                    </button>
                                </div>
                                {mainCourse.sub_courses.filter(course => course.title.toLowerCase().includes(searchQuery.toLowerCase())).length} {mainCourse.sub_courses.filter(course => course.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 1 ? 'course' : 'courses'} {searchQuery && 'found'}
                            </div>
                            <form className="w-full max-w-xs" onSubmit={e => { e.preventDefault(); }}>
                                <div className="relative">
                                    <input
                                        id="subcourse-search"
                                        type="text"
                                        placeholder="Search courses..."
                                        className="w-full px-4 py-2 pr-10 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        autoComplete="off"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <svg
                                        className="absolute w-5 h-5 text-gray-400 right-3 top-2.5 pointer-events-none"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                    >
                                        <circle cx="11" cy="11" r="8" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
                                    </svg>
                                </div>
                            </form>
                        </div>
                        {/* Sub Courses Grid/List */}

                        <div className="mx-auto my-10">
                            {(() => {
                                // Filter courses based on search query
                                const filteredCourses = mainCourse.sub_courses.filter(course =>
                                    course.title.toLowerCase().includes(searchQuery.toLowerCase())
                                );

                                if (filteredCourses.length === 0) {
                                    return (
                                        <div className="py-12 text-center">
                                            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                            <p className="text-xl text-gray-600">
                                                {searchQuery ? `No courses found matching "${searchQuery}"` : 'No courses available yet. Check back soon!'}
                                            </p>
                                        </div>
                                    );
                                }

                                // Grid View
                                if (isVisible) {
                                    return (
                                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                                            {filteredCourses.map((subCourse) => (
                                                <Link
                                                    key={subCourse.id}
                                                    href={`/courses/${mainCourse.slug}/${subCourse.id}`}
                                                    className="flex flex-col overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-2xl hover:-translate-y-2 group"
                                                >
                                                    {/* Thumbnail */}
                                                    <div className="relative h-56 overflow-hidden bg-gray-200">
                                                        {subCourse.thumbnail ? (
                                                            <img
                                                                src={subCourse.thumbnail}
                                                                alt={subCourse.title}
                                                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                                                            />
                                                        ) : (
                                                            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-400 to-blue-600">
                                                                <BookOpen className="w-16 h-16 text-white opacity-50" />
                                                            </div>
                                                        )}
                                                        <div className="absolute px-3 py-1 rounded-full top-4 left-4 bg-black/60 backdrop-blur-sm">
                                                            <span className="text-xs font-semibold text-white capitalize">
                                                                {subCourse.level}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex flex-col flex-grow px-6 pt-4">
                                                        <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                                                            {subCourse.title}
                                                        </h3>
                                                        <div className="flex items-center justify-between mb-2">
                                                            {/* Price on the left */}
                                                            {subCourse.price !== undefined && (
                                                                <span className="text-lg font-semibold text-blue-600">
                                                                    {subCourse.price === 0 ? 'Free' : `$${subCourse.price}`}
                                                                </span>
                                                            )}

                                                            <div className="flex items-center justify-between border-t border-gray-100">
                                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                                    {subCourse.duration_hours && (
                                                                        <div className="flex items-center space-x-1">
                                                                            <Clock className="w-4 h-4" />
                                                                            <span>{subCourse.duration_hours}h</span>
                                                                        </div>
                                                                    )}
                                                                    {subCourse.lessons_count !== undefined && (
                                                                        <div className="flex items-center space-x-1">
                                                                            <BookOpen className="w-4 h-4" />
                                                                            <span>{subCourse.lessons_count} lessons</span>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {subCourse.students_count !== undefined && subCourse.students_count > 0 && (
                                                                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                                                                        <Users className="w-4 h-4" />
                                                                        <span>{subCourse.students_count}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex w-full py-2">
                                                            {subCourse.is_bought ? (
                                                                <button
                                                                    className="w-full px-4 py-2 font-semibold text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
                                                                    type="button"
                                                                >
                                                                    View
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    className="w-full px-4 py-2 font-semibold text-black transition-colors bg-[#f9a134] rounded hover:bg-yellow-400"
                                                                    type="button"
                                                                >
                                                                    Buy this course
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    );
                                }

                                // List View
                                return (
                                    <div className="space-y-4">
                                        {filteredCourses.map((subCourse) => (
                                            <Link
                                                key={subCourse.id}
                                                href={`/courses/${mainCourse.slug}/${subCourse.id}`}
                                                className="flex flex-col overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-xl sm:flex-row group"
                                            >
                                                {/* Thumbnail */}
                                                <div className="relative flex-shrink-0 w-full h-48 overflow-hidden bg-gray-200 sm:w-80">
                                                    {subCourse.thumbnail ? (
                                                        <img
                                                            src={subCourse.thumbnail}
                                                            alt={subCourse.title}
                                                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-400 to-blue-600">
                                                            <BookOpen className="w-16 h-16 text-white opacity-50" />
                                                        </div>
                                                    )}
                                                    <div className="absolute px-3 py-1 rounded-full top-4 left-4 bg-black/60 backdrop-blur-sm">
                                                        <span className="text-xs font-semibold text-white capitalize">
                                                            {subCourse.level}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="flex flex-col justify-between flex-grow p-6">
                                                    <div>
                                                        <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                                                            {subCourse.title}
                                                        </h3>
                                                        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
                                                            {subCourse.duration_hours && (
                                                                <div className="flex items-center space-x-1">
                                                                    <Clock className="w-4 h-4" />
                                                                    <span>{subCourse.duration_hours} hours</span>
                                                                </div>
                                                            )}
                                                            {subCourse.lessons_count !== undefined && (
                                                                <div className="flex items-center space-x-1">
                                                                    <BookOpen className="w-4 h-4" />
                                                                    <span>{subCourse.lessons_count} lessons</span>
                                                                </div>
                                                            )}
                                                            {subCourse.students_count !== undefined && subCourse.students_count > 0 && (
                                                                <div className="flex items-center space-x-1">
                                                                    <Users className="w-4 h-4" />
                                                                    <span>{subCourse.students_count} students</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                                        {subCourse.price !== undefined && (
                                                            <span className="text-2xl font-bold text-blue-600">
                                                                {subCourse.price === 0 ? 'Free' : `$${subCourse.price}`}
                                                            </span>
                                                        )}
                                                        <div className="flex gap-2">
                                                            {subCourse.is_bought ? (
                                                                <button
                                                                    className="px-6 py-2 font-semibold text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
                                                                    type="button"
                                                                >
                                                                    View Course
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    className="px-6 py-2 font-semibold text-black transition-colors bg-[#f9a134] rounded hover:bg-yellow-400"
                                                                    type="button"
                                                                >
                                                                    Buy this course
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                    {/* Right column: 4/12 */}
                    <div className="sm:col-span-3">
                        {/* Load and display course categories */}
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">Course Categories</h2>
                            <ul className="space-y-2">
                                {mainCourse.categories && mainCourse.categories.length > 0 ? (
                                    mainCourse.categories.map((cat: string) => (
                                        <li key={cat} className="px-3 py-1 text-gray-700 bg-gray-100 rounded hover:bg-blue-100">
                                            {cat}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-400">No categories</li>
                                )}
                            </ul>

                            {/* Featured Sub Courses (latest 5) */}
                            <div className="mt-8">
                                <h3 className="text-2xl font-semibold text-gray-800">Latest Courses</h3>
                                <hr className='my-4' />
                                <ul className="space-y-4">
                                    {mainCourse.sub_courses
                                        .slice()
                                        .sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime())
                                        .slice(0, 5)
                                        .map(subCourse => (
                                            <li key={subCourse.id}>
                                                <Link href={`/courses/${mainCourse.slug}/${subCourse.id}`} className="flex items-center w-64 gap-3 group">
                                                    <div className="flex-shrink-0 w-16 h-16 overflow-hidden bg-gray-200 rounded">
                                                        {subCourse.thumbnail ? (
                                                            <img src={subCourse.thumbnail} alt={subCourse.title} className="object-cover w-full h-full" />
                                                        ) : (
                                                            <BookOpen className="w-8 h-8 mx-auto my-4 text-gray-400" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-medium text-gray-900 truncate group-hover:text-blue-600">{subCourse.title}</div>
                                                        <div className="flex items-center justify-between">
                                                            {subCourse.price !== undefined && (
                                                                <div className="text-sm font-semibold text-blue-600">
                                                                    {subCourse.price === 0 ? 'Free' : `$${subCourse.price}`}
                                                                </div>
                                                            )}
                                                            <div className="text-xs text-gray-500">{subCourse.level}</div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CTA />
        </div>
    );
}
