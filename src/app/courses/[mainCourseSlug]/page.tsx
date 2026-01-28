import type { Metadata } from "next";
import MainCourseDetailPage from "./subcoursepage";

export const metadata: Metadata = {

    title: {
        default: ` | Italy UMA Academy`,
        template: "%s | Italy UMA Academy",
    },

    description:
        "",

    alternates: {
        canonical: "https://italyumaacademy.com/courses/",
        languages: {
            en: "https://italyumaacademy.com/courses/",
        },
    },

    keywords: [
        " ",
    ],

    robots: "index, follow",

    openGraph: {
        title: "",
        description: "",
        url: "https://italyumaacademy.com/courses/",
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
        title: "",
        description: "",
        images: [
            "https://italyumaacademy.com/assets/logos/logo.png",
        ],
    },
};

export default function Page() {
    return (
        <>
            <MainCourseDetailPage />
        </>
    )
}
