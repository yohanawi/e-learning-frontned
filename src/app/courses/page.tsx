import type { Metadata } from 'next';
import CoursesPage from './coursepage';
import { api } from '@/lib/api';

export const dynamic = 'force-dynamic';


// SEO Metadata with rich structured data
export const metadata: Metadata = {

    title: {
        default: "Courses | Italy UMA Academy",
        template: "%s | Italy UMA Academy",
    },

    description:
        "Explore our comprehensive Italian language courses designed for all levels. From beginner to advanced, master Italian with expert guidance, interactive lessons, and cultural immersion. Start your journey to fluency today!",

    alternates: {
        canonical: "https://italyumaacademy.com/courses",
        languages: {
            en: "https://italyumaacademy.com/courses",
        },
    },

    keywords: [
        "Italian language courses",
        "Learn Italian",
        "Italian lessons",
        "Language learning",
        "Italian for beginners",
        "Advanced Italian",
        "Italian grammar",
        "Italian vocabulary",
        "Italian culture",
        "Language immersion",
    ],

    robots: "index, follow",

    openGraph: {
        title: "Courses | Italy UMA Academy",
        description: "Explore our comprehensive Italian language courses designed for all levels. From beginner to advanced, master Italian with expert guidance, interactive lessons, and cultural immersion. Start your journey to fluency today!",
        url: "https://italyumaacademy.com/courses",
        type: "website",
        images: [
            {
                url: "https://italyumaacademy.com/assets/logos/logo.png",
                width: 1200,
                height: 630,
                alt: "Italy UMA Academy",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        site: "@italyumaacademy",
        title: "Courses | Italy UMA Academy",
        description: "Explore our comprehensive Italian language courses designed for all levels. From beginner to advanced, master Italian with expert guidance, interactive lessons, and cultural immersion. Start your journey to fluency today!",
        images: [
            "https://italyumaacademy.com/assets/logos/logo.png",
        ],
    },
};


export default async function Page({
    searchParams,
}: {
    searchParams?: { search?: string };
}) {
    try {
        const search = (searchParams?.search || "").trim();

        const response = search
            ? await api.courses.searchMainCourses(search)
            : await api.courses.getMainCourses();

        const mainCourses = response.data || [];

        return (
            <>
                <CoursesPage mainCourses={mainCourses} />
            </>
        );
    } catch (error) {
        console.error('Failed to fetch main courses:', error);
        // Return empty array on error
        return (
            <>
                <CoursesPage mainCourses={[]} />
            </>
        );
    }
}
