import type { Metadata } from "next";
import ContactUsPage from "./contactuspage";

export const metadata: Metadata = {
    metadataBase: new URL("https://italyumaacademy.com"),

    title: {
        default: "Contact Italy Uma Academy | Authorized Training Center",
        template: "%s | Italy Uma Academy",
    },

    description:
        "Italy Uma Academy is a leading training center offering specialized courses and certifications in Italy. Contact us for admissions, course details, and partnership opportunities.",

    alternates: {
        canonical: "https://italyumaacademy.com/contact-us",
        languages: {
            en: "https://italyumaacademy.com/contact-us",
        },
    },

    keywords: [
        "Italy Uma Academy contact",
        "training center Italy",
        "academy admissions Italy",
        "certification courses Italy",
        "Italy Uma Academy partnership",
        "professional training Italy",
        "Italy education center",
        "specialized courses Italy",
        "Italy Uma Academy support",
        "course inquiry Italy",
    ],

    robots: "index, follow",

    openGraph: {
        title: "Contact Italy Uma Academy | Authorized Training Center",
        description: "Italy Uma Academy is a leading training center offering specialized courses and certifications in Italy. Contact us for admissions, course details, and partnership opportunities.",
        url: "https://italyumaacademy.com/contact-us",
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
        title: "Contact Italy Uma Academy | Authorized Training Center",
        description: "Italy Uma Academy is a leading training center offering specialized courses and certifications in Italy. Contact us for admissions, course details, and partnership opportunities.",
        images: [
            "https://italyumaacademy.com/assets/logos/logo.png",
        ],
    },   
};

export default function Page() {
    return (
        <>
            <ContactUsPage />
        </>
    )
}
