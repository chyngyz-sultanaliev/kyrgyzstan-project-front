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
    ],
  },
};

module.exports = nextConfig;
