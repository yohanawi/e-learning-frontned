'use client';

import { useEffect, useState } from 'react';
import { api, SubCourse, Lesson } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { initializePayHere, startPayHerePayment, PayHerePayment } from '@/lib/payhere';
import Swal from 'sweetalert2';
import { Lock, CheckCircle, PlayCircle } from 'lucide-react';

export default function SubCoursePage() {
    const { token } = useAuth();
    const router = useRouter();
    const params = useParams();
    const subCourseId = parseInt(params?.subCourseId as string);

    const [subCourse, setSubCourse] = useState<SubCourse | null>(null);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [enrollment, setEnrollment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [paymentLoading, setPaymentLoading] = useState(false);

    useEffect(() => {
        if (subCourseId) {
            loadSubCourse();
            checkEnrollment();
            loadLessons();
        }
    }, [subCourseId, token]);

    const loadSubCourse = async () => {
        try {
            const response = await api.courses.getSubCourse(subCourseId.toString(), token || undefined);
            setSubCourse(response.data);
        } catch (error) {
            console.error('Failed to load sub course:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load course details',
            });
        } finally {
            setLoading(false);
        }
    };

    const checkEnrollment = async () => {
        if (!token) return;
        try {
            const response = await api.enrollments.getMyCourses(token);
            const userEnrollment = response.data.find(
                (e: any) => e.sub_course_id === subCourseId || e.sub_course?.id === subCourseId
            );
            setEnrollment(userEnrollment);
        } catch (error) {
            console.error('Failed to check enrollment:', error);
        }
    };

    const loadLessons = async () => {
        if (!token) return;
        try {
            const response = await api.lessons.getLessons(subCourseId.toString(), token);
            setLessons(response.data.lessons);
        } catch (error) {
            console.error('Failed to load lessons:', error);
        }
    };

    const handleEnroll = async () => {
        if (!token) {
            Swal.fire({
                icon: 'warning',
                title: 'Authentication Required',
                text: 'Please login to enroll in this course',
                showCancelButton: true,
                confirmButtonText: 'Go to Login',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/login');
                }
            });
            return;
        }

        if (!subCourse) return;

        // Free course - direct enrollment
        if (subCourse.price === 0) {
            try {
                setPaymentLoading(true);
                await api.enrollments.createEnrollment(subCourse.id, token);

                Swal.fire({
                    icon: 'success',
                    title: 'Enrolled Successfully!',
                    text: 'You have been enrolled in this course',
                    timer: 2000,
                    showConfirmButton: false
                });

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } catch (error: any) {
                Swal.fire({
                    icon: 'error',
                    title: 'Enrollment Failed',
                    text: error.message || 'Failed to enroll in the course',
                });
            } finally {
                setPaymentLoading(false);
            }
            return;
        }

        // Paid course - PayHere payment
        try {
            setPaymentLoading(true);

            // Initialize PayHere
            await initializePayHere();

            // Create payment
            const response = await api.payments.createPayment(
                {
                    sub_course_id: subCourse.id,
                    amount: subCourse.price,
                    currency: 'LKR',
                },
                token
            );

            const paymentData = response.data;

            // Validate required PayHere fields (prevents payhere.js crashing on null/undefined)
            const requiredFields: Array<keyof typeof paymentData> = [
                'merchant_id',
                'return_url',
                'cancel_url',
                'notify_url',
                'order_id',
                'hash',
                'currency',
                'amount',
            ];

            const missing = requiredFields.filter((key) => {
                const value = paymentData?.[key];
                return value === null || value === undefined || String(value).trim().length === 0;
            });

            if (missing.length > 0) {
                throw new Error(
                    `Payment gateway returned incomplete data: ${missing.join(', ')}`
                );
            }

            // Configure PayHere payment
            const payment: PayHerePayment = {
                sandbox: Boolean(paymentData.sandbox ?? true),
                merchant_id: String(paymentData.merchant_id),
                return_url: String(paymentData.return_url),
                cancel_url: String(paymentData.cancel_url),
                notify_url: String(paymentData.notify_url),
                order_id: String(paymentData.order_id),
                items: String(paymentData.item_description ?? paymentData.items ?? ''),
                amount: String(paymentData.amount),
                currency: String(paymentData.currency),
                hash: String(paymentData.hash),
                first_name: String(paymentData.first_name ?? ''),
                last_name: String(paymentData.last_name ?? ''),
                email: String(paymentData.email ?? ''),
                phone: paymentData.phone || '',
                address: paymentData.address || '',
                city: paymentData.city || '',
                country: String(paymentData.country ?? 'Sri Lanka'),
            };

            if (!payment.items || payment.items.trim().length === 0) {
                throw new Error('Payment item description is missing');
            }

            // Start PayHere payment
            startPayHerePayment(payment, {
                onCompleted: (orderId) => {
                    console.log('Payment completed:', orderId);
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        text: 'Redirecting to success page...',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    router.push(`/payment/success?order_id=${orderId}`);
                },
                onDismissed: () => {
                    console.log('Payment dismissed');
                    setPaymentLoading(false);
                    Swal.fire({
                        icon: 'info',
                        title: 'Payment Cancelled',
                        text: 'You cancelled the payment process',
                    });
                },
                onError: (error) => {
                    console.error('Payment error:', error);
                    setPaymentLoading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Payment Failed',
                        text: error || 'An error occurred during payment',
                    });
                },
            });
        } catch (error: any) {
            setPaymentLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Payment Initialization Failed',
                text: error.message || 'Failed to initialize payment',
            });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!subCourse) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
                    <Link href="/courses" className="mt-4 text-blue-600 hover:underline">
                        Browse all courses
                    </Link>
                </div>
            </div>
        );
    }

    const completedLessons = lessons.filter(l => l.is_completed).length;
    const progressPercentage = lessons.length > 0 ? (completedLessons / lessons.length) * 100 : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="py-16 text-white bg-gradient-to-r from-blue-600 to-blue-800">
                <div className="px-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
                        <div>
                            <div className="flex items-center mb-4 space-x-2">
                                <span className="px-3 py-1 text-sm font-semibold bg-blue-500 rounded-full">
                                    {subCourse.level}
                                </span>
                                <span className="px-3 py-1 text-sm font-semibold bg-blue-500 rounded-full">
                                    {subCourse.duration_hours} hours
                                </span>
                            </div>
                            <h1 className="mb-4 text-4xl font-bold">{subCourse.title}</h1>
                            <p className="mb-6 text-xl text-blue-100">{subCourse.short_description}</p>

                            {enrollment ? (
                                <div className="space-y-4">
                                    <div className="p-4 bg-white rounded-lg bg-opacity-20">
                                        <div className="flex justify-between mb-2 text-sm">
                                            <span>Your Progress</span>
                                            <span className="font-bold">{Math.round(progressPercentage)}%</span>
                                        </div>
                                        <div className="w-full h-3 bg-white rounded-full bg-opacity-30">
                                            <div
                                                className="h-3 transition-all bg-white rounded-full"
                                                style={{ width: `${progressPercentage}%` }}
                                            />
                                        </div>
                                        <p className="mt-2 text-sm">
                                            {completedLessons} of {lessons.length} lessons completed
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            const firstIncompleteLesson = lessons.find(l => !l.is_completed && !l.is_locked);
                                            if (firstIncompleteLesson) {
                                                router.push(`/lessons/${firstIncompleteLesson.id}`);
                                            }
                                        }}
                                        className="px-8 py-3 font-semibold text-blue-600 transition-colors bg-white rounded-lg hover:bg-blue-50"
                                    >
                                        Continue Learning
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <div className="text-3xl font-bold">
                                        {subCourse.price > 0 ? `$${subCourse.price}` : 'Free'}
                                    </div>
                                    <button
                                        onClick={handleEnroll}
                                        className="px-8 py-3 font-semibold text-blue-600 transition-colors bg-white rounded-lg hover:bg-blue-50"
                                    >
                                        Enroll Now
                                    </button>
                                </div>
                            )}
                        </div>

                        {subCourse.thumbnail && (
                            <div className="relative overflow-hidden rounded-lg shadow-2xl h-80">
                                <Image
                                    src={subCourse.thumbnail}
                                    alt={subCourse.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-8 lg:col-span-2">
                        {/* About */}
                        <div className="p-6 bg-white rounded-lg shadow">
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">About this course</h2>
                            <div className="prose text-gray-600 max-w-none">
                                {subCourse.description || subCourse.short_description}
                            </div>
                        </div>

                        {/* Lessons */}
                        <div className="p-6 bg-white rounded-lg shadow">
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">Course Curriculum</h2>

                            {!enrollment ? (
                                <div className="p-8 text-center rounded-lg bg-gray-50">
                                    <Lock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                        Enroll to See Lessons
                                    </h3>
                                    <p className="mb-4 text-gray-600">
                                        Get access to all course content and start learning today
                                    </p>
                                    <button
                                        onClick={handleEnroll}
                                        className="px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                                    >
                                        {subCourse.price > 0 ? `Enroll for $${subCourse.price}` : 'Enroll for Free'}
                                    </button>
                                </div>
                            ) : lessons.length === 0 ? (
                                <p className="text-gray-600">Loading lessons...</p>
                            ) : (
                                <div className="space-y-2">
                                    {lessons.map((lesson, index) => (
                                        <div
                                            key={lesson.id}
                                            className={`border rounded-lg p-4 transition-colors ${lesson.is_locked
                                                ? 'bg-gray-50 border-gray-200'
                                                : 'bg-white border-gray-300 hover:border-blue-500 cursor-pointer'
                                                }`}
                                            onClick={() => {
                                                if (!lesson.is_locked) {
                                                    router.push(`/lessons/${lesson.id}`);
                                                } else {
                                                    Swal.fire({
                                                        icon: 'info',
                                                        title: 'Lesson Locked',
                                                        text: 'Complete the previous lessons to unlock this one',
                                                    });
                                                }
                                            }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center flex-1 space-x-4">
                                                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full">
                                                        {lesson.is_completed ? (
                                                            <CheckCircle className="w-6 h-6 text-green-600" />
                                                        ) : lesson.is_locked ? (
                                                            <Lock className="w-5 h-5 text-gray-400" />
                                                        ) : (
                                                            <PlayCircle className="w-5 h-5 text-blue-600" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-900">
                                                            Lesson {index + 1}: {lesson.title}
                                                        </h3>
                                                        {lesson.short_description && (
                                                            <p className="mt-1 text-sm text-gray-600">
                                                                {lesson.short_description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    {lesson.duration_minutes && (
                                                        <span className="text-sm text-gray-500">
                                                            {lesson.duration_minutes} min
                                                        </span>
                                                    )}
                                                    {lesson.is_preview && !enrollment && (
                                                        <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded">
                                                            Preview
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky p-6 bg-white rounded-lg shadow top-6">
                            <h3 className="mb-4 text-lg font-bold text-gray-900">Course Includes</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">{lessons.length} video lessons</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">Lifetime access</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">Certificate of completion</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700">Progressive unlocking</span>
                                </li>
                            </ul>

                            {!enrollment && (
                                <button
                                    onClick={handleEnroll}
                                    className="w-full py-3 mt-6 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    {subCourse.price > 0 ? `Enroll for $${subCourse.price}` : 'Enroll for Free'}
                                </button>
                            )}
                        </div>
                        {/* Main Category Courses */}
                        <div className="p-6 mt-8 bg-white rounded-lg shadow">
                            <h4 className="mb-3 font-bold text-gray-900 text-md">Main Category Courses</h4>
                            <ul className="space-y-2">
                                {/* Example: Replace with actual API data */}
                                {subCourse?.main_categories?.map((cat: any) => (
                                    <li key={cat.id}>
                                        <Link href={`/courses/${cat.slug}`} className="text-blue-600 hover:underline">
                                            {cat.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Latest Popular Courses */}
                        <div className="p-6 mt-3 bg-white rounded-lg shadow">
                            <h4 className="mb-3 font-bold text-gray-900 text-md">Latest Popular Courses</h4>
                            {/* Search Bar */}
                            <div className="">
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    className="w-full px-4 py-2 text-black bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={e => {
                                        // Implement search logic here
                                    }}
                                />
                            </div>
                            <ul className="space-y-2">
                                {/* Example: Replace with actual API data */}
                                {subCourse?.popular_courses?.slice(0, 5).map((course: any) => (
                                    <li key={course.id}>
                                        <Link href={`/courses/${course.slug}`} className="text-blue-600 hover:underline">
                                            {course.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
