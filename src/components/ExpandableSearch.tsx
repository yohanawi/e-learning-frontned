"use client";

import { Search, X, BookOpen } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, type MainCourse } from "@/lib/api";

interface ExpandableSearchProps {
    placeholder?: string;
    onSearch?: (value: string) => void;
    inputWidthClass?: string;
    layout?: 'overlay' | 'push';
}

export default function ExpandableSearch({
    placeholder = "Search courses...",
    onSearch,
    inputWidthClass = "w-52",
    layout = 'overlay',
}: ExpandableSearchProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState("");
    const [searchResults, setSearchResults] = useState<MainCourse[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
                setSelectedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggle = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        if (!newState) {
            setValue("");
            setSearchResults([]);
            setShowResults(false);
            setSelectedIndex(-1);
        } else {
            // Focus input when opening
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setValue(v);
        onSearch?.(v);
        setSearchError(null);

        if (v.trim().length > 0) {
            setShowResults(true);
            setSelectedIndex(-1);
        } else {
            setSearchResults([]);
            setShowResults(false);
            setSelectedIndex(-1);
        }
    };

    // Debounced backend search
    useEffect(() => {
        if (!isOpen) return;

        const trimmed = value.trim();
        if (trimmed.length === 0) {
            setIsSearching(false);
            setSearchResults([]);
            setSearchError(null);
            return;
        }

        setIsSearching(true);
        setSearchError(null);

        const timeout = setTimeout(async () => {
            try {
                const res = await api.courses.searchMainCourses(trimmed);
                setSearchResults(res.data || []);
            } catch (err: any) {
                setSearchResults([]);
                setSearchError(err?.message || "Search failed");
            } finally {
                setIsSearching(false);
            }
        }, 250);

        return () => clearTimeout(timeout);
    }, [value, isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < searchResults.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
                    router.push(`/courses/${searchResults[selectedIndex].slug}`);
                    handleClose();
                } else if (value.trim().length > 0) {
                    router.push(`/courses?search=${encodeURIComponent(value)}`);
                    handleClose();
                }
                break;
            case 'Escape':
                e.preventDefault();
                setShowResults(false);
                setSelectedIndex(-1);
                break;
        }
    };

    const handleClose = () => {
        setValue("");
        setSearchResults([]);
        setShowResults(false);
        setSelectedIndex(-1);
        setIsOpen(false);
    };

    const handleResultClick = (slug: string) => {
        router.push(`/courses/${slug}`);
        handleClose();
    };

    const handleViewAll = () => {
        router.push(`/courses?search=${encodeURIComponent(value)}`);
        handleClose();
    };

    if (layout === 'overlay') {
        return (
            <div ref={searchRef} className="relative flex items-center w-8">
                <div className={`absolute right-0 transition-all duration-400 ease-in-out overflow-hidden ${isOpen ? `${inputWidthClass} opacity-100` : "w-0 opacity-0"}`}>
                    <div className="relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={value}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder={placeholder}
                            className={`h-8 w-full pr-8 pl-3 rounded-full bg-white/15 border border-white/25 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white/50 transition-all ${isOpen ? "scale-100" : "scale-95"}`}
                        />
                        {value && (
                            <button type="button" onClick={() => {
                                setValue("");
                                setSearchResults([]);
                                setShowResults(false);
                            }} aria-label="Clear search"
                                className="absolute transition-colors -translate-y-1/2 right-8 top-1/2 text-white/60 hover:text-white">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    {/* Search Results Dropdown */}
                    {showResults && searchResults.length > 0 && (
                        <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                            <div className="p-2">
                                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                                    Found {searchResults.length} {searchResults.length === 1 ? 'course' : 'courses'}
                                </div>
                                {searchResults.map((course, index) => (
                                    <button
                                        key={course.id}
                                        onClick={() => handleResultClick(course.slug)}
                                        className={`w-full text-left p-3 rounded-lg transition-colors duration-150 ${selectedIndex === index
                                            ? 'bg-blue-50 border-l-4 border-blue-600'
                                            : 'hover:bg-gray-50 border-l-4 border-transparent'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                                                <img
                                                    src={course.thumbnail || "/assets/images/blog.png"}
                                                    alt={course.title}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <BookOpen className="w-3 h-3 text-blue-600 flex-shrink-0" />
                                                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                                                        {course.title}
                                                    </h4>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                                                        {course.sub_courses_count} sub-courses
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                                <button
                                    onClick={handleViewAll}
                                    className="w-full mt-2 p-3 text-center text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                                >
                                    View all results for &quot;{value}&quot;
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Loading */}
                    {showResults && isSearching && (
                        <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4 text-sm text-gray-600">
                            Searching...
                        </div>
                    )}

                    {/* No Results */}
                    {showResults && !isSearching && searchResults.length === 0 && value.trim().length > 0 && (
                        <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-6 text-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Search className="w-6 h-6 text-gray-400" />
                            </div>
                            <p className="text-sm font-medium text-gray-900 mb-1">
                                {searchError ? "Search failed" : "No courses found"}
                            </p>
                            <p className="text-xs text-gray-500 mb-3">
                                {searchError ? searchError : "Try searching with different keywords"}
                            </p>
                            <Link
                                href="/courses"
                                onClick={handleClose}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <BookOpen className="w-4 h-4" />
                                Browse All Courses
                            </Link>
                        </div>
                    )}
                </div>
                <button type="button" aria-label="Search" onClick={toggle}
                    className={`relative z-10 bg-[#162765] h-8 w-8 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-[#213a94] ${isOpen ? "rotate-90" : "rotate-0"}`}>
                    {isOpen ? (
                        <X className="w-4 h-4 text-white transition-transform" />
                    ) : (
                        <Search className="w-4 h-4 text-white transition-transform" />
                    )}
                </button>
            </div>
        );
    }

    // Push layout
    return (
        <div ref={searchRef} className={`relative flex items-center transition-all duration-400 ease-in-out overflow-visible ${isOpen ? inputWidthClass : 'w-8'}`}>
            <button type="button" aria-label="Search" onClick={toggle}
                className={`bg-[#162765] flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-[#213a94] ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                {isOpen ? (
                    <X className="w-4 h-4 text-white transition-transform" />
                ) : (
                    <Search className="w-4 h-4 text-white transition-transform" />
                )}
            </button>
            <div className={`ml-2 flex-1 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                <div className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="w-full h-8 pl-3 pr-8 text-sm text-white border rounded-full bg-white/15 border-white/25 placeholder-white/60 focus:outline-none focus:border-white/50"
                    />
                    {value && (
                        <button type="button" onClick={() => {
                            setValue("");
                            setSearchResults([]);
                            setShowResults(false);
                        }} aria-label="Clear search"
                            className="absolute transition-colors -translate-y-1/2 right-2 top-1/2 text-white/60 hover:text-white">
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}

                    {/* Search Results Dropdown */}
                    {showResults && searchResults.length > 0 && (
                        <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50 min-w-[400px]">
                            <div className="p-2">
                                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                                    Found {searchResults.length} {searchResults.length === 1 ? 'course' : 'courses'}
                                </div>
                                {searchResults.map((course, index) => (
                                    <button
                                        key={course.id}
                                        onClick={() => handleResultClick(course.slug)}
                                        className={`w-full text-left p-3 rounded-lg transition-colors duration-150 ${selectedIndex === index
                                            ? 'bg-blue-50 border-l-4 border-blue-600'
                                            : 'hover:bg-gray-50 border-l-4 border-transparent'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                                                <img
                                                    src={course.thumbnail || "/assets/images/blog.png"}
                                                    alt={course.title}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <BookOpen className="w-3 h-3 text-blue-600 flex-shrink-0" />
                                                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                                                        {course.title}
                                                    </h4>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                                                        {course.sub_courses_count} sub-courses
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                                <button
                                    onClick={handleViewAll}
                                    className="w-full mt-2 p-3 text-center text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                                >
                                    View all results for &quot;{value}&quot;
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Loading */}
                    {showResults && isSearching && (
                        <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4 text-sm text-gray-600 min-w-[400px]">
                            Searching...
                        </div>
                    )}

                    {/* No Results */}
                    {showResults && !isSearching && searchResults.length === 0 && value.trim().length > 0 && (
                        <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-6 text-center min-w-[400px]">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Search className="w-6 h-6 text-gray-400" />
                            </div>
                            <p className="text-sm font-medium text-gray-900 mb-1">
                                {searchError ? "Search failed" : "No courses found"}
                            </p>
                            <p className="text-xs text-gray-500 mb-3">
                                {searchError ? searchError : "Try searching with different keywords"}
                            </p>
                            <Link
                                href="/courses"
                                onClick={handleClose}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <BookOpen className="w-4 h-4" />
                                Browse All Courses
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
