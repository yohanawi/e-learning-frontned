import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ["images.unsplash.com", "cdn-icons-png.flaticon.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
      },
    ],
  },
};

export default nextConfig;
