/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: true,
    images: { allowFutureImage: true }
  },
  images: {
    domains: ["lh3.googleusercontent.com"]
  }
};
