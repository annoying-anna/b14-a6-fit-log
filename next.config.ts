import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Workout illustrations are served from the FitLog API's CDN.
    remotePatterns: [
      { protocol: "https", hostname: "img.magnific.com" },
      { protocol: "https", hostname: "**.magnific.com" },
    ],
  },
};

export default nextConfig;
