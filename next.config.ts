import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Old URLs keep working
  async redirects() {
    return [{ source: "/play", destination: "/playground", permanent: true }];
  },
};

export default nextConfig;
