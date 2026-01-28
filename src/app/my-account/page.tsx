import type { Metadata } from "next";
import MyAccountPage from "./myaccountpage";

export const metadata: Metadata = {

    title: {
        default: "My Account | Italy UMA Academy",
        template: "%s | Italy UMA Academy",
    },

    description:
        "Manage your account settings and view your enrolled courses at Italy UMA Academy.",

    alternates: {
        canonical: "https://italyumaacademy.com/my-account",
        languages: {
            en: "https://italyumaacademy.com/my-account",
        },
    },

    keywords: [
        "Italy UMA Academy",
        "my account",
        "account settings",
        "enrolled courses",
    ],

    robots: "index, follow",

    openGraph: {
        title: "My Account | Italy UMA Academy",
        description: "Manage your account settings and view your enrolled courses at Italy UMA Academy.",
        url: "https://italyumaacademy.com/my-account",
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
        title: "My Account | Italy UMA Academy",
        description: "Manage your account settings and view your enrolled courses at Italy UMA Academy.",
        images: [
            "https://italyumaacademy.com/assets/logos/logo.png",
        ],
    },
};

export default function Page() {
    return (
        <>
            <MyAccountPage />
        </>
    )
}
