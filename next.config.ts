import type { NextConfig } from "next";

/**
 * NEXT_STATIC_EXPORT=1 produces a fully static site (used by the GitHub Pages
 * preview build). The normal build on Vercel keeps server rendering + ISR.
 */
const isStaticExport = process.env.NEXT_STATIC_EXPORT === "1";

/** Sub-path the static preview is served from, e.g. "/b14-a6-fit-log". */
const basePath = process.env.NEXT_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  // Handed to the app so /public files keep working under a sub-path.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  trailingSlash: isStaticExport,
  basePath: basePath || undefined,
  images: {
    // GitHub Pages cannot run Next.js' image optimizer.
    unoptimized: isStaticExport,
    // Workout illustrations are served from the FitLog API's CDN.
    remotePatterns: [
      { protocol: "https", hostname: "img.magnific.com" },
      { protocol: "https", hostname: "**.magnific.com" },
    ],
  },
};

export default nextConfig;
