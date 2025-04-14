import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.postimg.cc",
        protocol: "https",
        port: ""
      }
    ]
  }
};

export default nextConfig;
