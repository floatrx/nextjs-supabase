/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
      },
      {
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 'floatrx.s3.eu-central-1.amazonaws.com',
      },
      {
        hostname: 'nextui.org',
      },
    ],
  },
};

export default nextConfig;
