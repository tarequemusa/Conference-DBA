// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "lh3.googleusercontent.com", // Whitelist Google Profile Pictures
//       },
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // This allows all images from your Cloudinary account
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Added this so Google Profile photos also work
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
