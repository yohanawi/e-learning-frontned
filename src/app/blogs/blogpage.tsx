"use client";

import Link from "next/link";
import Image from "next/image";
import { api, BACKEND_ORIGIN, Blog } from "@/lib/api";
import { useState, useEffect } from "react";
import { ArrowRight, ChevronRight, Home } from "lucide-react";
import { FiGrid, FiList, FiSearch, FiCalendar, FiUser, FiEye } from "react-icons/fi";

export default function BlogsPage() {

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchBlogs();
    }, [searchQuery, currentPage]);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            setErrorMessage(null);
            const response = await api.blogs.getAll({
                search: searchQuery,
                per_page: 9,
                page: currentPage,
            });
            setBlogs(response.data);
            setTotalPages(response.last_page);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to load blogs";
            setErrorMessage(message);
            setBlogs([]);
            setTotalPages(1);
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const stripHtml = (html: string) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    return (
        <>
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
                                            <span className="font-semibold text-white">Blogs</span>
                                        </div>
                                    </nav>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight opacity-0 animate-[slideInUp_0.8s_ease-out_0.4s_forwards] leading-tight">
                                        Blogs
                                    </h1>
                                    <p className="max-w-xl text-base lg:text-lg text-gray-300 leading-relaxed opacity-0 animate-[slideInUp_0.8s_ease-out_0.6s_forwards]">
                                        Explore the latest articles, insights, and updates from Italy UMA Academy, your source for quality education and training programs in Italy.
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

                {/* Toolbar */}
                <section className="sticky top-0 z-10 bg-white border-b shadow-sm">
                    <div className="container px-8 py-4 mx-auto max-w-7xl lg:pt-10">
                        <div className="flex justify-between gap-4 md:items-center">
                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className="flex-1 max-w-xs">
                                <div className="flex overflow-hidden border rounded-md">
                                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search articles..."
                                        className="w-full px-3 py-2 text-sm text-gray-800 bg-white border outline-none focus:ring-2 focus:ring-blue-600" />
                                    <button type="submit" className="px-3 text-white transition-colors duration-300 bg-[#1a2e77] flex items-center justify-center" aria-label="Search">
                                        <FiSearch />
                                    </button>
                                </div>
                            </form>

                            <div className="flex items-center gap-2">
                                <p className="hidden text-gray-600 md:block">
                                    {loading ? "Loading..." : `${blogs.length} articles found`}
                                </p>
                                <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`} aria-label="Grid view">
                                    <FiGrid size={20} />
                                </button>
                                <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`} aria-label="List view">
                                    <FiList size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Blogs Grid/List */}
                <section className="container px-4 py-12 mx-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-16 h-16 border-t-4 border-blue-600 rounded-full animate-spin"></div>
                        </div>
                    ) : errorMessage ? (
                        <div className="max-w-3xl py-16 mx-auto text-center">
                            <p className="text-2xl font-semibold text-gray-800">Blogs failed to load</p>
                            <p className="max-w-2xl mx-auto mt-3 text-gray-600">{errorMessage}</p>
                            <p className="max-w-2xl mx-auto mt-2 text-sm text-gray-500">
                                Check that your backend API is reachable and that `NEXT_PUBLIC_API_URL` points to the correct `/api` base.
                            </p>
                            <div className="flex items-center justify-center gap-3 mt-6">
                                <button
                                    onClick={() => fetchBlogs()}
                                    className="px-5 py-2.5 bg-[#1a2e77] text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                                >
                                    Retry
                                </button>
                                <button
                                    onClick={() => { setSearchQuery(""); setCurrentPage(1); }}
                                    className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-blue-100 via-purple-100 to-blue-50">
                                <FiSearch className="w-12 h-12 text-blue-600" />
                            </div>
                            <p className="flex items-center gap-2 mb-2 text-3xl font-semibold text-gray-500">
                                <FiGrid className="inline-block text-blue-400 w-7 h-7" />
                                No blogs found
                            </p>
                            <p className="mb-4 text-gray-400">
                                We couldn't find any articles matching your search.
                            </p>
                            {searchQuery && (
                                <button
                                    onClick={() => { setSearchQuery(""); setCurrentPage(1); }}
                                    className="inline-flex items-center gap-2 px-4 py-2 mt-2 font-medium text-blue-700 transition-all bg-blue-100 rounded-lg hover:bg-blue-200"
                                >
                                    <FiList className="w-5 h-5" />
                                    Clear search
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            {viewMode === "grid" ? (
                                <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
                                    {blogs.map((blog) => (
                                        <article key={blog.id} className="overflow-hidden transition-all duration-300 bg-white shadow-md hover:shadow-xl group">
                                            <Link href={`/blogs/${blog.slug}`}>
                                                <div className="relative h-56 overflow-hidden">
                                                    {blog.thumbnail ? (
                                                        <img src={`${BACKEND_ORIGIN}/storage/${blog.thumbnail}`} alt={blog.title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" />
                                                    ) : (
                                                        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-400 to-purple-500">
                                                            <span className="text-6xl font-bold text-white">
                                                                {blog.title.charAt(0)}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="px-6 pt-2 pb-5">
                                                    <h2 className="mb-3 text-2xl font-bold text-gray-800 transition-colors group-hover:text-blue-600 line-clamp-2">
                                                        {blog.title}
                                                    </h2>
                                                    <p className="mb-4 text-gray-600 line-clamp-3">
                                                        {stripHtml(blog.description).substring(0, 150)}...
                                                    </p>
                                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                                        <div className="flex items-center gap-2">
                                                            <FiUser size={16} />
                                                            <span>{blog.author.name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex items-center gap-1">
                                                                <FiCalendar size={16} />
                                                                <span>{formatDate(blog.published_date)}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <FiEye size={16} />
                                                                <span>{blog.views}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {blogs.map((blog) => (
                                        <article key={blog.id} className="mx-auto overflow-hidden transition-all duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl group max-w-7xl">
                                            <Link href={`/blogs/${blog.slug}`}>
                                                <div className="flex flex-col md:flex-row">
                                                    <div className="relative flex-shrink-0 w-full h-48 overflow-hidden md:w-60">
                                                        {blog.thumbnail ? (
                                                            <img src={`${BACKEND_ORIGIN}/storage/${blog.thumbnail}`} alt={blog.title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" />
                                                        ) : (
                                                            <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-400 to-purple-500">
                                                                <span className="text-6xl font-bold text-white">
                                                                    {blog.title.charAt(0)}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 px-6 py-7">
                                                        <h2 className="mb-3 text-3xl font-bold text-gray-800 transition-colors group-hover:text-blue-600">
                                                            {blog.title}
                                                        </h2>
                                                        <p className="mb-4 text-gray-600 line-clamp-2">
                                                            {blog.description}
                                                        </p>
                                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                                            <div className="flex items-center gap-2">
                                                                <FiUser size={16} />
                                                                <span className="font-medium">
                                                                    {blog.author.name}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <div className="flex items-center gap-1">
                                                                    <FiCalendar size={16} />
                                                                    <span>{formatDate(blog.published_date)}</span>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <FiEye size={16} />
                                                                    <span>{blog.views} views</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </article>
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-12">
                                    <button onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1} className="px-4 py-2 text-gray-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                        Previous
                                    </button>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 rounded-lg transition-colors ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="px-4 py-2 text-gray-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </main>
        </>
    );
}
