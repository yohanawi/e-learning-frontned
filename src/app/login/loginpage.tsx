"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Award, BookOpen, GraduationCap } from "lucide-react";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password, rememberMe);
            router.push("/my-account");
        } catch (err: any) {
            setError(err.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex overflow-hidden md:min-h-screen min-h-[80vh] bg-gray-50">
            {/* Left Side - Login Form */}
            <div className="flex items-center justify-center w-full px-8 lg:w-1/2 animate-fade-in">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="text-center animate-slide-down">
                        <Link href="/" className="inline-flex items-center space-x-2">
                            <GraduationCap className="w-10 h-10 text-blue-600" />
                            <h1 className="text-3xl font-bold text-gray-900">
                                Italy UMA Academy
                            </h1>
                        </Link>
                    </div>

                    {/* Header */}
                    <div
                        className="text-center animate-slide-down"
                        style={{ animationDelay: "0.1s" }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                        <p className="mt-2 text-gray-600">
                            Sign in to continue your learning journey
                        </p>
                    </div>

                    {/* Form */}
                    <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="px-4 py-3 text-sm text-red-700 border border-red-400 rounded-lg bg-red-50 animate-shake">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full px-4 py-3 text-black transition-all duration-200 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full px-4 py-3 text-black transition-all duration-200 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 text-gray-700">
                                        Remember me
                                    </label>
                                </div>
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 transition-colors hover:text-blue-700"
                                >
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="relative flex items-center justify-center w-full px-4 py-3 text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed group"
                            >
                                <span>{loading ? "Signing in..." : "Sign in"}</span>
                                {!loading && (
                                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link
                                    href="/register"
                                    className="font-medium text-blue-600 transition-colors hover:text-blue-700"
                                >
                                    Create account
                                </Link>
                            </p>
                        </div>

                        <div className="mt-6 text-center">
                            <Link
                                href="/"
                                className="inline-flex items-center px-6 py-2 text-sm font-semibold text-blue-600 transition-all duration-300 bg-white rounded-full shadow-md hover:bg-blue-600 hover:text-white hover:scale-105 hover:shadow-xl group"
                            >
                                <svg
                                    className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                                <span>Back to home</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Image & Content */}
            <div className="relative hidden w-1/2 lg:block">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute w-64 h-64 bg-white rounded-full -top-10 -left-10 animate-float"></div>
                        <div className="absolute right-0 bg-white rounded-full w-96 h-96 top-1/3 animate-float-delayed"></div>
                        <div className="absolute bottom-0 bg-white rounded-full w-80 h-80 left-1/4 animate-float"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full px-12 text-white">
                        <div className="max-w-lg space-y-8 text-center animate-fade-in">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full bg-opacity-20 backdrop-blur-sm animate-bounce-slow">
                                <BookOpen className="w-10 h-10" />
                            </div>

                            <h2 className="text-4xl font-bold leading-tight animate-slide-up">
                                Start Your Learning Journey with Italy UMA Academy
                            </h2>

                            <p
                                className="text-xl text-blue-100 animate-slide-up"
                                style={{ animationDelay: "0.2s" }}
                            >
                                Access world-class courses, earn recognized certifications, and
                                advance your career with our cutting-edge e-learning platform.
                            </p>

                            <div
                                className="grid grid-cols-3 gap-6 pt-8 animate-slide-up"
                                style={{ animationDelay: "0.4s" }}
                            >
                                <div className="space-y-2">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-lg bg-opacity-20 backdrop-blur-sm">
                                        <GraduationCap className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold">500+</h3>
                                    <p className="text-sm text-blue-100">Expert Instructors</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-lg bg-opacity-20 backdrop-blur-sm">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold">1000+</h3>
                                    <p className="text-sm text-blue-100">Online Courses</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-lg bg-opacity-20 backdrop-blur-sm">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold">50k+</h3>
                                    <p className="text-sm text-blue-100">Students Enrolled</p>
                                </div>
                            </div>

                            <div
                                className="pt-8 animate-slide-up"
                                style={{ animationDelay: "0.6s" }}
                            >
                                <Link
                                    href="/courses"
                                    className="inline-flex items-center px-8 py-3 text-blue-600 transition-all duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 group"
                                >
                                    <span className="font-medium">Explore Courses</span>
                                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes floatDelayed {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-30px) scale(1.08);
          }
        }

        @keyframes bounceSlow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slide-down {
          animation: slideDown 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: floatDelayed 8s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}
