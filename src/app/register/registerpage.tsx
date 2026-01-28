"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    Award,
    BookOpen,
    Globe,
    GraduationCap,
    Trophy,
    Users,
} from "lucide-react";

export default function RegisterPage() {
    const { register } = useAuth();
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== passwordConfirmation) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        setLoading(true);

        try {
            await register(name, email, password, passwordConfirmation);
            router.push("/my-account");
        } catch (err: any) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen overflow-hidden bg-gray-50">
            {/* Left Side - Image & Content */}
            <div className="relative hidden w-full lg:block lg:w-1/2">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-pink-600">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute bg-white rounded-full w-72 h-72 -top-20 -right-20 animate-float"></div>
                        <div className="absolute bg-white rounded-full w-96 h-96 top-1/2 -left-32 animate-float-delayed"></div>
                        <div className="absolute w-64 h-64 bg-white rounded-full bottom-10 right-1/4 animate-float"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full px-12 text-white">
                        <div className="max-w-lg space-y-8 text-center animate-fade-in">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full bg-opacity-20 backdrop-blur-sm animate-pulse-slow">
                                <Trophy className="w-12 h-12" />
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold leading-tight animate-slide-up">
                                    Join Italy's Leading E-Learning Platform
                                </h2>

                                <p
                                    className="text-lg text-blue-100 animate-slide-up"
                                    style={{ animationDelay: "0.2s" }}
                                >
                                    Unlock your potential with world-class education. Start
                                    learning today and transform your future.
                                </p>
                            </div>

                            {/* Features Grid */}
                            <div
                                className="grid grid-cols-2 gap-6 animate-slide-up"
                                style={{ animationDelay: "0.4s" }}
                            >
                                <div className="p-6 transition-all duration-300 bg-white rounded-xl bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 hover:scale-105">
                                    <Users className="w-8 h-8 mx-auto mb-3" />
                                    <h3 className="text-2xl font-bold">50,000+</h3>
                                    <p className="text-sm text-blue-100">Active Students</p>
                                </div>

                                <div className="p-6 transition-all duration-300 bg-white rounded-xl bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 hover:scale-105">
                                    <BookOpen className="w-8 h-8 mx-auto mb-3" />
                                    <h3 className="text-2xl font-bold">1,000+</h3>
                                    <p className="text-sm text-blue-100">Quality Courses</p>
                                </div>

                                <div className="p-6 transition-all duration-300 bg-white rounded-xl bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 hover:scale-105">
                                    <Award className="w-8 h-8 mx-auto mb-3" />
                                    <h3 className="text-2xl font-bold">500+</h3>
                                    <p className="text-sm text-blue-100">Expert Instructors</p>
                                </div>

                                <div className="p-6 transition-all duration-300 bg-white rounded-xl bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 hover:scale-105">
                                    <Globe className="w-8 h-8 mx-auto mb-3" />
                                    <h3 className="text-2xl font-bold">EU</h3>
                                    <p className="text-sm text-blue-100">
                                        Recognized Certificates
                                    </p>
                                </div>
                            </div>

                            <div
                                className="space-y-4 animate-slide-up"
                                style={{ animationDelay: "0.6s" }}
                            >
                                <Link
                                    href="/courses"
                                    className="inline-flex items-center px-8 py-2 text-lg font-medium text-blue-600 transition-all duration-300 bg-white rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 group"
                                >
                                    <span>Browse Courses</span>
                                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>

                                <p className="text-sm text-blue-200">
                                    "The best investment I've made in my career!" - Maria R.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Registration Form */}

            <div className="flex items-center justify-center w-full px-8 py-12 lg:w-1/2 animate-fade-in">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo - Mobile Only */}
                    <div className="text-center lg:hidden animate-slide-down">
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
                        <h2 className="text-3xl font-bold text-gray-900">
                            Create your account
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Start your learning journey today
                        </p>
                    </div>

                    {/* Form */}
                    <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                        <div className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="px-4 py-3 text-sm text-red-700 border border-red-400 rounded-lg bg-red-50 animate-shake">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Full name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full px-4 py-3 text-black transition-all duration-200 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400"
                                        placeholder="John Doe"
                                    />
                                </div>

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
                                        autoComplete="new-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full px-4 py-3 text-black transition-all duration-200 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400"
                                        placeholder="••••••••"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Must be at least 8 characters
                                    </p>
                                </div>

                                <div>
                                    <label
                                        htmlFor="password-confirmation"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Confirm password
                                    </label>
                                    <input
                                        id="password-confirmation"
                                        name="password-confirmation"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={passwordConfirmation}
                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                                        className="block w-full px-4 py-3 text-black transition-all duration-200 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex items-start">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    required
                                    className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="terms"
                                    className="block ml-2 text-sm text-gray-700"
                                >
                                    I agree to the{" "}
                                    <Link
                                        href="/terms-and-conditions"
                                        className="font-medium text-blue-600 transition-colors hover:text-blue-700"
                                    >
                                        Terms and Conditions
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href="/privacy-policy"
                                        className="font-medium text-blue-600 transition-colors hover:text-blue-700"
                                    >
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                onClick={handleSubmit}
                                className="relative flex items-center justify-center w-full px-4 py-3 text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 hover:shadow-xl disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed group"
                            >
                                <span>
                                    {loading ? "Creating account..." : "Create account"}
                                </span>
                                {!loading && (
                                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                )}
                            </button>
                        </div>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 text-gray-500 bg-gray-50">
                                        Already have an account?
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link
                                    href="/login"
                                    className="flex items-center justify-center w-full px-4 py-2 text-gray-700 transition-all duration-300 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:shadow-md group"
                                >
                                    <span>Sign in</span>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 transition-all duration-300 bg-white border border-blue-200 rounded-lg shadow-sm hover:bg-blue-50 hover:text-blue-900 hover:shadow-md group"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                                <span>Back to home</span>
                            </Link>
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

                @keyframes pulseSlow {
                0%,
                100% {
                    transform: scale(1);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.05);
                    opacity: 0.9;
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

                .animate-pulse-slow {
                animation: pulseSlow 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
