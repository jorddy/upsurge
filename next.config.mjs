import { env } from "./src/server/env.mjs";
import withPWA from "next-pwa";

const nextConfig = withPWA({
  pwa: { dest: "public" },
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: true
  }
});

export default nextConfig;
