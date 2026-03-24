/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/Fruit',
  assetPrefix: '/Fruit/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
