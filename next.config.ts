import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Old URLs keep working
  async redirects() {
    return [
      { source: "/play", destination: "/playground", permanent: true },
      { source: "/guestbook", destination: "/visitors", permanent: true },
      { source: "/journey", destination: "/about#journey", permanent: true },
    ];
  },
};

export default nextConfig;
