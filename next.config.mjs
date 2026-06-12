/** @type {import('next').NextConfig} */
const nextConfig = {
  // Reduce stale webpack chunks during dev hot reload
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
