import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SingleBlogPage from './singleblogpage';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Helper function to fetch blog data for metadata
async function getBlogBySlug(slug: string) {
  try {
    const response = await fetch(`${API_URL}/blogs/${slug}`, {
      cache: 'no-store', // Ensures fresh data on each request
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching blog for metadata:', error);
    return null;
  }
}

// Helper function to strip HTML tags
function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

// Generate metadata for SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ 'single-blog': string }>
}): Promise<Metadata> {
  const { 'single-blog': slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  // Strip HTML from description for meta tags
  const plainDescription = stripHtmlTags(blog.description).substring(0, 160);
  const imageUrl = blog.thumbnail
    ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/storage/${blog.thumbnail}`
    : '/assets/images/default-blog.jpg';

  return {

    title: {
      default: `${blog.title} | Italy UMA Academy`,
      template: "%s | Italy UMA Academy",
    },

    description: plainDescription,
    alternates: {
      canonical: `https://italyumaacademy.com/blogs/${blog.slug}`,
      languages: {
        en: `https://italyumaacademy.com/blogs/${blog.slug}`,
      },
    },

    keywords: blog.tags || 'education, blog, learning, Italy UMA Academy',

    robots: "index, follow",

    openGraph: {
      title: blog.title,
      description: plainDescription,
      url: `https://italyumaacademy.com/blogs/${blog.slug}`,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Italy UMA Academy",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@italyumaacademy",
      title: blog.title,
      description: plainDescription,
      images: [
        imageUrl
      ],
    },
  };
}

// Main page component (Server Component)
export default async function Page({
  params
}: {
  params: Promise<{ 'single-blog': string }>
}) {
  const { 'single-blog': slug } = await params;

  // Optional: Pre-fetch blog data for better UX
  // If the blog doesn't exist, you can handle it here or let the client component handle it
  const blog = await getBlogBySlug(slug);

  // If you want to return a 404 page when blog is not found on server side
  // Uncomment the following lines:
  // if (!blog) {
  //   notFound();
  // }

  return <SingleBlogPage slug={slug} />;
}
