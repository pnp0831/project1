const path = require('path');

/**
 * @type {import('next').NextConfig}
 */
let nextConfig = {
  /* config options here */
  reactStrictMode: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
};

if (process.env.ANALYZE) {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });

  nextConfig = withBundleAnalyzer(nextConfig);
}

module.exports = nextConfig;
