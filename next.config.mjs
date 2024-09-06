/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['esrasbucket.s3.eu-north-1.amazonaws.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://dev.digitopia.co/api/a2/signIn',
      },
    ];
  },
};

export default nextConfig;
