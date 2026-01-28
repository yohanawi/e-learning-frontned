'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import Player from '@vimeo/player';
import Swal from 'sweetalert2';
import { ArrowLeft, CheckCircle, Clock, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function LessonPlayerPage() {
    const params = useParams();
    const router = useRouter();
    const { token, loading: authLoading } = useAuth();
    const lessonId = parseInt(params?.id as string);

    const [lesson, setLesson] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [player, setPlayer] = useState<any>(null);
    const [progress, setProgress] = useState(0);
    const iframeRef = useRef<HTMLDivElement>(null);
    const progressIntervalRef = useRef<any>(null);

    useEffect(() => {
        if (authLoading) return;

        if (!token) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'Please login to watch lessons',
                confirmButtonText: 'Go to Login'
            }).then(() => {
                router.push('/login');
            });
            return;
        }

        if (lessonId) {
            loadLesson();
        }

        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        };
    }, [lessonId, token, authLoading, router]);

    const loadLesson = async () => {
        try {
            const response = await api.lessons.getLesson(lessonId, token!);

            if (!response.data.can_access) {
                Swal.fire({
                    icon: 'error',
                    title: 'Access Denied',
                    text: response.message || 'You cannot access this lesson',
                    confirmButtonText: 'Go Back'
                }).then(() => {
                    router.back();
                });
                return;
            }

            setLesson(response.data);

            // Initialize video player after lesson data loads
            setTimeout(() => {
                initializePlayer(response.data);
            }, 100);

        } catch (error: any) {
            console.error('Failed to load lesson:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load lesson',
            });
            router.back();
        } finally {
            setLoading(false);
        }
    };

    const initializePlayer = (lessonData: any) => {
        if (!iframeRef.current || !lessonData.video_id) return;

        // Create Vimeo iframe
        const iframe = document.createElement('iframe');
        iframe.src = `https://player.vimeo.com/video/${lessonData.video_id}?h=0&autoplay=0&title=0&byline=0&portrait=0`;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.frameBorder = '0';
        iframe.allow = 'autoplay; fullscreen; picture-in-picture';
        iframe.allowFullscreen = true;

        iframeRef.current.innerHTML = '';
        iframeRef.current.appendChild(iframe);

        // Initialize Vimeo Player
        const vimeoPlayer = new Player(iframe);
        setPlayer(vimeoPlayer);

        // Resume playback from last position
        if (lessonData.progress && lessonData.progress.last_watched_second > 0) {
            vimeoPlayer.setCurrentTime(lessonData.progress.last_watched_second);
        }

        // Track time updates
        vimeoPlayer.on('timeupdate', (data: any) => {
            const watchedPercentage = Math.floor((data.seconds / data.duration) * 100);
            setProgress(watchedPercentage);
        });

        // Auto-save progress every 10 seconds
        progressIntervalRef.current = setInterval(() => {
            saveProgress(vimeoPlayer);
        }, 10000);

        // Save on pause
        vimeoPlayer.on('pause', () => {
            saveProgress(vimeoPlayer);
        });

        // Save on end
        vimeoPlayer.on('ended', () => {
            saveProgress(vimeoPlayer, true);
        });
    };

    const saveProgress = async (vimeoPlayer: any, isEnded = false) => {
        if (!vimeoPlayer || !lesson) return;

        try {
            const currentTime = await vimeoPlayer.getCurrentTime();
            const duration = await vimeoPlayer.getDuration();
            const percentage = isEnded ? 100 : Math.floor((currentTime / duration) * 100);

            await api.lessons.updateProgress(lessonId, {
                watched_seconds: Math.floor(currentTime),
                percentage: percentage,
            }, token!);

            // If completed, show celebration
            if (percentage >= (lesson.completion_percentage || 80) && !lesson.progress?.is_completed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Lesson Completed! 🎉',
                    text: 'Great job! The next lesson is now unlocked.',
                    timer: 3000,
                    showConfirmButton: false,
                });

                // Reload to update lesson status
                setTimeout(() => {
                    loadLesson();
                }, 3000);
            }
        } catch (error) {
            console.error('Failed to save progress:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Lesson not found</h2>
                    <button onClick={() => router.back()} className="mt-4 text-blue-600 hover:underline">
                        ← Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white shadow-sm">
                <nav className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center space-x-2 text-gray-700 transition-colors hover:text-blue-600"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back to Course</span>
                        </button>
                        <div className="flex items-center space-x-4">
                            <Link href="/my-account" className="text-gray-700 hover:text-blue-600">
                                My Account
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Video Player */}
                    <div className="lg:col-span-2">
                        <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                            {/* Video Container */}
                            <div
                                ref={iframeRef}
                                className="relative bg-black"
                                style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}
                            >
                                <div className="absolute inset-0">
                                    {/* Vimeo iframe will be inserted here */}
                                </div>
                            </div>

                            {/* Lesson Info */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h1 className="mb-2 text-2xl font-bold text-gray-900">
                                            {lesson.title}
                                        </h1>
                                        {lesson.description && (
                                            <p className="text-gray-600">
                                                {lesson.description}
                                            </p>
                                        )}
                                    </div>
                                    {lesson.progress?.is_completed && (
                                        <div className="flex items-center ml-4 space-x-2 text-green-600">
                                            <CheckCircle className="w-6 h-6" />
                                            <span className="font-semibold">Completed</span>
                                        </div>
                                    )}
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-6">
                                    <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
                                        <span>Your Progress</span>
                                        <span className="font-semibold">{progress}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-gray-200 rounded-full">
                                        <div
                                            className="h-3 transition-all duration-300 bg-blue-600 rounded-full"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">
                                        Complete {lesson.completion_percentage || 80}% to mark as finished
                                    </p>
                                </div>

                                {/* Duration */}
                                {lesson.formatted_duration && (
                                    <div className="flex items-center mt-4 space-x-2 text-gray-600">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-sm">{lesson.formatted_duration}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky p-6 bg-white rounded-lg shadow-lg top-24">
                            <h3 className="mb-4 text-lg font-bold text-gray-900">
                                Course Progress
                            </h3>

                            {lesson.progress && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50">
                                        <div className="flex items-center space-x-3">
                                            <BookOpen className="w-5 h-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm text-gray-600">Watch Time</p>
                                                <p className="text-xl font-bold text-gray-900">{progress}%</p>
                                            </div>
                                        </div>
                                    </div>

                                    {lesson.progress.is_completed ? (
                                        <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                                            <div className="flex items-center mb-2 space-x-2 text-green-700">
                                                <CheckCircle className="w-5 h-5" />
                                                <span className="font-semibold">Lesson Completed!</span>
                                            </div>
                                            <p className="text-sm text-green-600">
                                                You can now access the next lesson.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                                            <p className="text-sm text-yellow-800">
                                                Watch {lesson.completion_percentage || 80}% to complete this lesson and unlock the next one.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="pt-6 mt-6 border-t">
                                <button
                                    onClick={() => router.back()}
                                    className="flex items-center justify-center w-full px-4 py-3 space-x-2 font-semibold text-gray-800 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Back to Course</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
