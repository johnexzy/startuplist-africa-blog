/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        port: '',
        pathname: '/img/logos/**',
      },
      {
        protocol: 'https',
        hostname: 'startuplistafrica.files.wordpress.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
