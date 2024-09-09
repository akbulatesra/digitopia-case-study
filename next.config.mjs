import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const SIGNIN_URL = 'https://dev.digitopia.co/api/a2/signIn';
const DATA_URL = 'http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['esrasbucket.s3.eu-north-1.amazonaws.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/signIn',
        destination: SIGNIN_URL,
      },
      {
        source: '/api/industries',
        destination: `${DATA_URL}:8080/industries`,
      },
      {
        source: '/api/countries',
        destination: `${DATA_URL}:8080/countries`,
      },
      {
        source: '/api/organization/:id/detail',
        destination: `${DATA_URL}:8181/organization/:id/detail`,
      },
      {
        source: '/api/impact-runs',
        destination: `${DATA_URL}:8484/impact-runs`,
      },
      {
        source: '/api/impact-run/:id/recommendations',
        destination: `${DATA_URL}:8283/impact-run/:id/recommendations`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
