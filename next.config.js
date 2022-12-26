/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "firebasestorage.googleapis.com",
  //       port: "**",
  //       pathname: "/**",
  //     },
  //   ],
  // },
};
module.exports = {
  images: {
    formats: ["image/png", "image/jpeg", "image/jpg"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

const removeImports = require("next-remove-imports")();
module.exports = removeImports({});
