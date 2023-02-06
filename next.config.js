/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["imagedelivery.net", "videodelivery.net"],
  },
};

module.exports = nextConfig
