/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },

  env: {
    EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
    EMAILJS_TEMPLATES_ID: process.env.EMAILJS_TEMPLATES_ID,
  },
};

module.exports = nextConfig;
