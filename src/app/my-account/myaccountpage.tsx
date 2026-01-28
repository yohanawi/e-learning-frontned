'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { api, Enrollment } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MyAccountPage() {
    const { user, token, logout, loading: authLoading } = useAuth();
    const router = useRouter();
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [enrollmentsLoading, setEnrollmentsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');

    const loadEnrollments = useCallback(async () => {
        if (!token) return;
        setEnrollmentsLoading(true);
        try {
            const status = activeTab === 'all' ? undefined : activeTab;
            const response = await api.enrollments.getMyCourses(token, status);
            setEnrollments(response.data);
        } catch (error) {
            console.error('Failed to load enrollments:', error);
        } finally {
            setEnrollmentsLoading(false);
        }
    }, [activeTab, token]);

    useEffect(() => {
        if (authLoading) return;

        if (!token) {
            router.push('/login');
            return;
        }

        loadEnrollments();
    }, [token, authLoading, router, loadEnrollments]);

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    if ((authLoading || enrollmentsLoading) && enrollments.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 mx-auto border-b-2 border-blue-600 rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600">Loading your courses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* User Profile Section */}
            <div className="py-12 text-white bg-gradient-to-r from-blue-600 to-blue-800">
                <div className="px-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-20 h-20 text-3xl font-bold bg-blue-400 rounded-full">
                                {user?.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">{user?.name}</h1>
                                <p className="text-blue-100">{user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center px-4 py-2 font-semibold text-white transition rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-8 py-5 mx-auto max-w-7xl">
                {/* Stats Section */}
                <div className="grid grid-cols-1 gap-6 my-5 md:grid-cols-3">
                    <div className="p-6 bg-white rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-blue-500 rounded-md">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Total Courses</p>
                                <p className="text-2xl font-bold text-gray-900">{enrollments.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-green-500 rounded-md">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {enrollments.filter(e => e.status === 'completed').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-yellow-500 rounded-md">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">In Progress</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {enrollments.filter(e => e.status === 'active').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Tabs */}
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px space-x-8">
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`${activeTab === 'all'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                All Courses
                            </button>
                            <button
                                onClick={() => setActiveTab('active')}
                                className={`${activeTab === 'active'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                In Progress
                            </button>
                            <button
                                onClick={() => setActiveTab('completed')}
                                className={`${activeTab === 'completed'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                Completed
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Courses Grid */}
                {enrollments.length === 0 ? (
                    <div className="py-12 text-center">
                        <div className="mb-4 text-gray-400">
                            <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-gray-900">No courses yet</h3>
                        <p className="mb-4 text-gray-600">
                            {activeTab === 'all'
                                ? "You haven't enrolled in any courses yet"
                                : activeTab === 'active'
                                    ? "You don't have any courses in progress"
                                    : "You haven't completed any courses yet"}
                        </p>
                        <Link
                            href="/courses"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                        >
                            Browse Courses
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {enrollments.map((enrollment) => (
                            <div key={enrollment.id} className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-xl">
                                {enrollment.sub_course.thumbnail ? (
                                    <img
                                        src={enrollment.sub_course.thumbnail}
                                        alt={enrollment.sub_course.title}
                                        className="object-cover w-full h-40"
                                    />
                                ) : (
                                    <div className="w-full h-40 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                                )}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded ${enrollment.status === 'completed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {enrollment.status === 'completed' ? 'Completed' : 'In Progress'}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {enrollment.sub_course.level}
                                        </span>
                                    </div>

                                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                        {enrollment.sub_course.title}
                                    </h3>

                                    <p className="mb-4 text-sm text-gray-600">
                                        {enrollment.main_course.title}
                                    </p>

                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                        <div className="flex justify-between mb-1 text-sm">
                                            <span className="text-gray-600">Progress</span>
                                            <span className="font-medium text-blue-600">{enrollment.progress_percentage}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-200 rounded-full">
                                            <div
                                                className="h-2 transition-all bg-blue-600 rounded-full"
                                                style={{ width: `${enrollment.progress_percentage}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Last Accessed Lesson */}
                                    {enrollment.last_accessed_lesson && (
                                        <p className="mb-4 text-xs text-gray-500">
                                            Last watched: {enrollment.last_accessed_lesson.title}
                                        </p>
                                    )}

                                    {/* Certificate */}
                                    {enrollment.certificate ? (
                                        <div className="mb-4">
                                            <div className="flex items-center mb-2 text-sm text-green-600">
                                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                Certificate Earned!
                                            </div>
                                            <a
                                                href={enrollment.certificate.verification_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-blue-600 hover:underline"
                                            >
                                                View Certificate →
                                            </a>
                                        </div>
                                    ) : null}

                                    {/* Action Button */}
                                    <Link
                                        href={`/courses/${enrollment.main_course.slug}/${enrollment.sub_course.slug}`}
                                        className="block py-2 text-center text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                                    >
                                        {enrollment.status === 'completed' ? 'Review Course' : 'Continue Learning'}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
