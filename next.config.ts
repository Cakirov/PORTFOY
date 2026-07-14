import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server be reached from a phone/other device on the same
  // network (e.g. over Tailscale) — Next.js blocks cross-origin requests to
  // dev-only assets by default, matched by hostname only (no port needed).
  allowedDevOrigins: ["100.110.230.41"],
};

export default nextConfig;
