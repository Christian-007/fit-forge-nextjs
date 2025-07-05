/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

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
      { source: '/points', destination: '/dashboard/points' },
      { source: '/profile', destination: '/dashboard/profile' },
    ];
  },
  output: 'standalone',
  images: isProd
    ? {
        loader: 'custom',
        loaderFile: './cloudflare-image-loader.ts',
      }
    : {},
};

export default nextConfig;
