import type { Metadata } from "next";
import SitemapPage from "./sitemappage";

export const metadata: Metadata = {
    title: {
        default: "Sitemap | Italy UMA Academy",
        template: "%s | Italy UMA Academy",
    },

    description:
        "Explore the sitemap of Italy UMA Academy to easily navigate through our educational programs, courses, and resources.",

    alternates: {
        canonical: "https://italyumaacademy.com/sitemap",
        languages: {
            en: "https://italyumaacademy.com/sitemap",
        },
    },

    keywords: [
        "Italy UMA Academy",
        "sitemap UMA Academy",
        "education in Italy",
        "Italian academy sitemap",
        "study in Italy",
        "UMA Academy programs",
        "Italian education institution",
    ],

    robots: "index, follow",

    openGraph: {
        title: "Sitemap | Italy UMA Academy",
        description: "Explore the sitemap of Italy UMA Academy to easily navigate through our educational programs, courses, and resources.",
        url: "https://italyumaacademy.com/sitemap",
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
        title: "Sitemap | Italy UMA Academy",
        description: "Explore the sitemap of Italy UMA Academy to easily navigate through our educational programs, courses, and resources.",
        images: [
            "https://italyumaacademy.com/assets/logos/logo.png",
        ],
    },
};

export default function Page() {
    return <SitemapPage />;
}
