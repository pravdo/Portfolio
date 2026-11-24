import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    // Lets SCSS modules write `@use "mixins" as *;` instead of long relative paths.
    loadPaths: [path.join(process.cwd(), "src/styles")],
  },
};

export default nextConfig;
