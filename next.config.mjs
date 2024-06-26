/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    // typedRoutes: true, <- This is not working as expected yet! After change this, you need tsc --noEmit to found the errors...
  },
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
      {
        hostname: 'szonwoyyizcvkomytada.supabase.co',
      },
    ],
  },
};

export default nextConfig;
