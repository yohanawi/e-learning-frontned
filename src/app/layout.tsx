import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Script from "next/script";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollTopButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Italy UMA Academy - Learn at Your Own Pace",
  description: "Video-based learning management system with progressive course unlocking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.payhere.lk/lib/payhere.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <NavBar />
          {children}
          <ScrollToTopButton />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
