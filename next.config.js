/** @type {import('next').NextConfig} */
const nextConfig = {
  // trailingSlash: false,
  output: "export",
  trailingSlash: true,
  distDir: "build",
};
module.exports = nextConfig;