import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  skipTrailingSlashRedirect: false,
  experimental: {
    cpus: 2,
  },
};

export default nextConfig;
