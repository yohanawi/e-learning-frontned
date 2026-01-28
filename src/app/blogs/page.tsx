import type { Metadata } from "next";
import BlogsPage from "./blogpage";

export const metadata: Metadata = {

  title: {
    default: "Blogs | Italy UMA Academy",
    template: "%s | Italy UMA Academy",
  },

  description:
    "Explore the latest articles, insights, and updates from Italy UMA Academy, your source for quality education and training programs in Italy.",

  alternates: {
    canonical: "https://italyumaacademy.com/blogs",
    languages: {
      en: "https://italyumaacademy.com/blogs",
    },
  },

  keywords: [
    "Italy UMA Academy",
    "Italy education",
    "Italy training programs",
    "Italy courses",
    "Italy UMA Academy blogs",
    "education in Italy",
    "training in Italy",
    "Italy UMA Academy articles",
    "Italy UMA Academy updates",
    "Italy UMA Academy insights",
  ],

  robots: "index, follow",

  openGraph: {
    title: "Blogs | Italy UMA Academy",
    description: "Explore the latest articles, insights, and updates from Italy UMA Academy, your source for quality education and training programs in Italy.",
    url: "https://italyumaacademy.com/blogs",
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
    title: "Blogs | Italy UMA Academy",
    description: "Explore the latest articles, insights, and updates from Italy UMA Academy, your source for quality education and training programs in Italy.",
    images: [
      "https://italyumaacademy.com/assets/logos/logo.png",
    ],
  },
};

export default function Page() {
  return (
    <>
      <BlogsPage />
    </>
  )
}
