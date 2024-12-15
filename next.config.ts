import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint checks during production builds
  },
  /* config options here */
  webpack: config => {
    config.resolve.alias.canvas = false
    return config
  },
}

export default nextConfig
