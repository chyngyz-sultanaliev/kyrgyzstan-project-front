/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kyrtag.kg",
      },
      {
        protocol: "https",
        hostname: "www.journalofnomads.com",
      },
      {
        protocol: "https",
        hostname: "images.alltrails.com",
      },
    ],
  },
};

module.exports = nextConfig;
