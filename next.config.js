/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["korean", "latin"] } },
    ],
  },
  images: {
    domains: ["imagedelivery.net", "videodelivery.net"],
  },
};

module.exports = nextConfig
