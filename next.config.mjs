/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/dashboard/todos',
        destination: '/todos',
        permanent: true,
      },
      {
        source: '/dashboard/profile',
        destination: '/profile',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/todos', destination: '/dashboard/todos' },
      { source: '/profile', destination: '/dashboard/profile' },
    ];
  },
};

export default nextConfig;
