import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    position: "bottom-right", // ou 'top-left', 'bottom-right', 'top-right'
  },
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
