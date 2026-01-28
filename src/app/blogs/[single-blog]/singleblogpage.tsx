'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api, Blog, BlogComment } from '@/lib/api';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { FiCalendar, FiUser, FiEye, FiSearch, FiStar, FiClock } from 'react-icons/fi';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRight, ArrowRightIcon, ChevronRight, Home } from 'lucide-react';

interface SingleBlogPageProps {
    slug: string;
}

export default function SingleBlogPage({ slug }: SingleBlogPageProps) {
    const router = useRouter();
    const { user, token } = useAuth();

    const [blog, setBlog] = useState<Blog | null>(null);
    const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
    const [comments, setComments] = useState<BlogComment[]>([]);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState('');
    const [rating, setRating] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (slug) {
            fetchBlogData();
        }
    }, [slug]);

    const fetchBlogData = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching blog with slug:', slug);

            // Fetch blog and latest blogs first (these don't require auth)
            const [blogData, latestData] = await Promise.all([
                api.blogs.getBySlug(slug),
                api.blogs.getLatest(5),
            ]);

            console.log('Blog data received:', blogData);
            setBlog(blogData);
            setLatestBlogs(latestData.filter((b) => b.slug !== slug));

            // Fetch comments separately (might require auth or fail gracefully)
            try {
                const commentsData = await api.blogs.getComments(slug, token || undefined);
                setComments(commentsData);
            } catch (commentError: any) {
                console.log('Comments not available:', commentError.message);
                setComments([]); // Set empty comments if not available
            }
        } catch (error: any) {
            console.error('Error fetching blog:', error);
            setError(error.message || 'Failed to load blog');
        } finally {
            setLoading(false);
        }
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !token) {
            router.push('/login');
            return;
        }

        try {
            setSubmitting(true);
            const result = await api.blogs.addComment(
                slug,
                { comment: commentText, rating: rating > 0 ? rating : undefined },
                token
            );
            setComments([result.comment, ...comments]);
            setCommentText('');
            setRating(0);
        } catch (error) {
            console.error('Error submitting comment:', error);
            alert('Failed to submit comment');
        } finally {
            setSubmitting(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/blogs?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getReadingTime = (text: string) => {
        const wordsPerMinute = 200;
        const wordCount = text.split(/\s+/).length;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return minutes;
    };

    const stripHtml = (html: string) => {
        if (typeof window === 'undefined') return html;
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-t-4 border-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-800">
                        {error ? 'Error Loading Blog' : 'Blog Not Found'}
                    </h1>
                    {error && <p className="mb-4 text-red-600">{error}</p>}
                    <Link href="/blogs" className="text-blue-600 underline hover:text-blue-700">
                        Back to Blogs
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <main className="min-h-screen bg-gray-50">
                {/* Hero Image */}
                <section className="relative h-[40vh] md:h-[60vh] min-h-[400px] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0">
                            <Image src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=1080&fit=crop"
                                alt="About Us Hero Background" width={1920} height={1080} className="w-full h-full object-cover opacity-30 animate-[zoomIn_20s_ease-in-out_infinite_alternate]" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>
                        </div>
                        {blog.thumbnail && (
                            <img
                                src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/storage/${blog.thumbnail}`}
                                alt={blog.title} className="w-full h-full object-cover opacity-30 animate-[zoomIn_20s_ease-in-out_infinite_alternate]" />
                        )}
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
                                            <Link href="/blogs" className="relative flex items-center gap-1 text-gray-300 transition-all duration-300 hover:text-white group">
                                                Blogs
                                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                            </Link>
                                            <ChevronRight className="flex-shrink-0 w-4 h-4 text-gray-400 sm:w-5 sm:h-5" />
                                            <span className="font-semibold text-white">{blog.title}</span>
                                        </div>
                                    </nav>
                                </div>
                                <div className="opacity-0 animate-[slideInRight_0.8s_ease-out_0.8s_forwards]">
                                    <Link href="/blogs" className="group inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#233785] text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 whitespace-nowrap">
                                        Back to Blogs
                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 sm:w-5 sm:h-5 group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-12 sm:h-16 bg-gradient-to-t from-white/80 to-transparent"></div>
                </section>

                <div className="container relative z-10 px-8 mx-auto -mt-40 max-w-7xl">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Main Content - Left Column */}
                        <div className="lg:col-span-2">
                            <article className="overflow-hidden bg-white shadow-xl rounded-2xl">
                                {/* Article Header */}
                                <div className="p-8 md:p-12">
                                    <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <FiCalendar size={16} />
                                            <span>{formatDate(blog.published_date)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FiClock size={16} />
                                            <span>{getReadingTime(stripHtml(blog.description))} min read</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FiEye size={16} />
                                            <span>{blog.views} views</span>
                                        </div>
                                    </div>

                                    <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                                        {blog.title}
                                    </h1>

                                    {/* Author Info */}
                                    <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
                                        <div className="flex items-center justify-center w-16 h-16 text-2xl font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                                            {blog.author.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold text-gray-900">{blog.author.name}</p>
                                            <p className="text-gray-500">Author</p>
                                        </div>
                                    </div>

                                    {/* Article Content */}
                                    <div
                                        className="mt-8 prose prose-lg max-w-none"
                                        dangerouslySetInnerHTML={{ __html: blog.description }}
                                    />
                                </div>

                                {/* Comments Section */}
                                <div className="p-8 border-t border-gray-200 md:p-12 bg-gray-50">
                                    <h2 className="mb-8 text-xl font-bold text-gray-900">
                                        Comments ({comments.length})
                                    </h2>

                                    {/* Comment Form */}
                                    {user ? (
                                        <form onSubmit={handleCommentSubmit} className="mb-8">
                                            <div className="p-6 bg-white shadow-sm rounded-xl">
                                                <div className="mb-4">
                                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                                        Your Comment
                                                    </label>
                                                    <textarea
                                                        value={commentText}
                                                        onChange={(e) => setCommentText(e.target.value)}
                                                        rows={4}
                                                        required
                                                        className="w-full px-4 py-3 text-black bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        placeholder="Share your thoughts..."
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                                        Rating (Optional)
                                                    </label>
                                                    <div className="flex gap-2">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <button
                                                                key={star}
                                                                type="button"
                                                                onClick={() => setRating(star)}
                                                                className="text-3xl transition-colors focus:outline-none"
                                                            >
                                                                <FiStar
                                                                    className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                                                />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={submitting}
                                                    className="px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                                >
                                                    {submitting ? 'Submitting...' : 'Post Comment'}
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="p-6 mb-8 text-center bg-white shadow-sm rounded-xl">
                                            <p className="mb-4 text-gray-600">
                                                Please login to leave a comment
                                            </p>
                                            <Link
                                                href="/login"
                                                className="inline-block px-8 py-2 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                                            >
                                                Login
                                            </Link>
                                        </div>
                                    )}

                                    {/* Comments List */}
                                    <div className="space-y-6">
                                        {comments.map((comment) => (
                                            <div key={comment.id} className="p-6 bg-white shadow-sm rounded-xl">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 font-bold text-white rounded-full bg-gradient-to-r from-blue-400 to-purple-400">
                                                        {comment.user.name.charAt(0)}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div>
                                                                <p className="font-semibold text-gray-900">{comment.user.name}</p>
                                                                <p className="text-sm text-gray-500">
                                                                    {formatDate(comment.created_at)}
                                                                </p>
                                                            </div>
                                                            {comment.rating && (
                                                                <div className="flex gap-1">
                                                                    {[...Array(comment.rating)].map((_, i) => (
                                                                        <FiStar key={i} className="text-yellow-400 fill-yellow-400" size={16} />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <p className="text-gray-700">{comment.comment}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        </div>

                        {/* Sidebar - Right Column */}
                        <div className="lg:col-span-1">
                            <div className="sticky space-y-8 top-24">
                                {/* Search Widget */}
                                <div className="p-6 bg-white shadow-md rounded-2xl">
                                    <h3 className="mb-4 text-2xl font-bold text-gray-900">Search</h3>
                                    <form onSubmit={handleSearch}>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search blogs..."
                                                className="w-full px-4 py-2 pr-12 text-black bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <button
                                                type="submit"
                                                className="absolute p-2 text-gray-400 transition-colors -translate-y-1/2 right-2 top-1/2 hover:text-blue-600"
                                            >
                                                <FiSearch size={20} />
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Latest Blogs Widget */}
                                <div className="p-6 bg-white shadow-md rounded-2xl">
                                    <h3 className="mb-6 text-2xl font-bold text-gray-900">Latest Posts</h3>
                                    <div className="space-y-4">
                                        {latestBlogs.map((latestBlog) => (
                                            <Link
                                                key={latestBlog.id}
                                                href={`/blogs/${latestBlog.slug}`}
                                                className="flex gap-4 group"
                                            >
                                                <div className="relative flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg">
                                                    {latestBlog.thumbnail ? (
                                                        <img
                                                            src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/storage/${latestBlog.thumbnail}`}
                                                            alt={latestBlog.title}
                                                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center w-full h-full font-bold text-white bg-gradient-to-br from-blue-400 to-purple-500">
                                                            {latestBlog.title.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="mb-1 font-semibold text-gray-900 transition-colors group-hover:text-blue-600 line-clamp-2">
                                                        {latestBlog.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500">
                                                        {formatDate(latestBlog.published_date)}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <Link
                                        href="/blogs"
                                        className="flex items-center justify-center mx-auto mt-6 font-semibold text-center text-blue-600 hover:text-blue-700"
                                    >
                                        View All Posts <ArrowRightIcon className="inline-block w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            <style jsx global>{`
                .prose {
                    color: #374151;
                }
                .prose h1,
                .prose h2,
                .prose h3,
                .prose h4 {
                    color: #111827;
                    font-weight: 700;
                    margin-top: 2em;
                    margin-bottom: 1em;
                }
                .prose p {
                    margin-bottom: 1.5em;
                    line-height: 1.8;
                }
                .prose img {
                    border-radius: 1rem;
                    margin: 2em 0;
                }
                .prose a {
                    color: #2563eb;
                    text-decoration: underline;
                }
                .prose a:hover {
                     color: #1d4ed8;
                }
                .prose ul,
                .prose ol {
                    margin: 1.5em 0;
                    padding-left: 1.5em;
                }
                .prose li {
                    margin-bottom: 0.5em;
                }
                .prose blockquote {
                    border-left: 4px solid #2563eb;
                    padding-left: 1.5em;
                    margin: 2em 0;
                    font-style: italic;
                    color: #6b7280;
                }
                .prose code {
                    background-color: #f3f4f6;
                    padding: 0.2em 0.4em;
                    border-radius: 0.25rem;
                    font-size: 0.875em;
                }
                .prose pre {
                    background-color: #1f2937;
                    color: #f9fafb;
                    padding: 1.5em;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                    margin: 2em 0;
                }
                .prose pre code {
                    background-color: transparent;
                    padding: 0;
                }
            `}</style>
        </>
    );
}
