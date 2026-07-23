import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Keep Turbopack scoped to this app. The repository has a separate root
  // lockfile, which otherwise makes Next watch the entire repository.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
