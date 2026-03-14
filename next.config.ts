import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://notehub-public.goit.study/api/:path*',
      },
    ];
  },
};

export default nextConfig;
