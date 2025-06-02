/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**', // allow all images from this domain
      },
    ], domains: ['res.cloudinary.com','via.placeholder.com'],
  },
};

export default nextConfig;

