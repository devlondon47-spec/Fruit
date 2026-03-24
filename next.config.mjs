/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/lawyer',
  assetPrefix: '/lawyer/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
