/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/dashboard/:path*',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/todos', destination: '/dashboard/todos' },
      { source: '/todos/add', destination: '/dashboard/todos/add' },
      { source: '/todos/:id', destination: '/dashboard/todos/:id' },
      { source: '/profile', destination: '/dashboard/profile' },
    ];
  },
};

export default nextConfig;
