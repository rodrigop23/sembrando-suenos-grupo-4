/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**/*",
      },
      {
        protocol: "https",
        hostname: "harmonious-duck-41878a5889.strapiapp.com",
        port: "443",
        pathname: "/uploads/**/*",
      },
    ],
  },
};

export default nextConfig;
