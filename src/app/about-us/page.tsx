import type { Metadata } from "next";
import AboutUsPage from "./aboutuspage";

export const metadata: Metadata = {
    metadataBase: new URL("https://italyumaacademy.com"),

    title: {
        default: "About Us | Italy UMA Academy",
        template: "%s | Italy UMA Academy",
    },

    description:
        "Learn about Italy UMA Academy, a leading institution dedicated to providing quality education and training programs in Italy.",

    alternates: {
        canonical: "https://italyumaacademy.com/about-us",
        languages: {
            en: "https://italyumaacademy.com/about-us",
        },
    },

    keywords: [
        "Italy UMA Academy",
        "about UMA Academy",
        "education in Italy",
        "Italian academy",
        "study in Italy",
        "UMA Academy programs",
        "Italian education institution",
        "academy in Italy",
        "quality education Italy",
        "training programs Italy",
        "Italian academy courses",
        "UMA Academy history",
        "educational excellence Italy",
        "Italy academic institution",
        "UMA Academy mission",
    ],

    robots: "index, follow",

    openGraph: {
        title: "About Us | Italy UMA Academy",
        description: "Learn about Italy UMA Academy, a leading institution dedicated to providing quality education and training programs in Italy.",
        url: "https://italyumaacademy.com/about-us",
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
        title: "About Us | Italy UMA Academy",
        description: "Learn about Italy UMA Academy, a leading institution dedicated to providing quality education and training programs in Italy.",
        images: [
            "https://italyumaacademy.com/assets/logos/logo.png",
        ],
    },
};

export default function Page() {
    return (
        <>
            <AboutUsPage />
        </>
    )
}
