/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/gelato-connect-mis-prototype',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
