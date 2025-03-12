/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },
};

module.exports = nextConfig;
