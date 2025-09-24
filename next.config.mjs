const nextConfig = {
  env: {
    NEXT_PUBLIC_HAS_NOCODB_TOKEN: process.env.NOCODB_TOKEN ? '1' : ''
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
};

export default nextConfig;
