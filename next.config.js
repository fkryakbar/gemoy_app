/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};
// module.exports = {
//   images: {
//     formats: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "firebasestorage.googleapis.com",
//         port: "",
//         pathname: "/v0/**",
//       },
//     ],
//   },
// };
module.exports = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};
module.exports = nextConfig;

const removeImports = require("next-remove-imports")();
module.exports = removeImports({});
