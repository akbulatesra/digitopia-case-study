/** @type {import('next').NextConfig} */
const nextConfig = {
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
