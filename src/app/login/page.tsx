import type { Metadata } from "next";
import LoginPage from "./loginpage";

export const metadata: Metadata = {
    title: {
        default: "Login to Italy Uma Academy | Authorized Training Center",
        template: "%s | Italy Uma Academy",
    },

    description:
        "Italy Uma Academy is a leading training center offering specialized courses and certifications in Italy. Contact us for admissions, course details, and partnership opportunities.",

    alternates: {
        canonical: "https://italyumaacademy.com/login",
        languages: {
            en: "https://italyumaacademy.com/login",
        },
    },

    keywords: [
        "Italy Uma Academy login",
        "training center Italy",
        "academy admissions Italy",
        "certification courses Italy",
        "Italy Uma Academy partnership",
        "professional training Italy",
        "Italy education center",
    ],

    robots: "index, follow",

    openGraph: {
        title: "Login to Italy Uma Academy | Authorized Training Center",
        description: "Italy Uma Academy is a leading training center offering specialized courses and certifications in Italy. Contact us for admissions, course details, and partnership opportunities.",
        url: "https://italyumaacademy.com/login",
        type: "website",
        images: [
            {
                url: "https://italyumaacademy.com/assets/logos/logo.png",
                width: 1200,
                height: 630,
                alt: "Italy Uma Academy Logo",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        site: "@italyumaacademy",
        title: "Login to Italy Uma Academy | Authorized Training Center",
        description: "Italy Uma Academy is a leading training center offering specialized courses and certifications in Italy. Contact us for admissions, course details, and partnership opportunities.",
        images: [
            "https://italyumaacademy.com/assets/logos/logo.png",
        ],
    },
};

export default function Page() {
    return (
        <>
            <LoginPage />
        </>
    )
}
