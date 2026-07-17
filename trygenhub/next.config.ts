import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the file-tracing root to this project directory. Without this,
  // Next.js auto-detects the workspace root by walking up for lockfiles
  // and can pick the wrong one when this project sits inside a larger
  // parent directory that also happens to contain a lockfile.
  outputFileTracingRoot: __dirname,
  // The Replit dev preview is served through a proxied iframe on a
  // different origin than localhost, so Next's dev-server origin check
  // needs to allow it explicitly. Harmless in production (unused there).
  allowedDevOrigins: ["*"],
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ];

    // HSTS only makes sense (and is only safe to assume) for a real
    // HTTPS production deployment. Deliberately no includeSubDomains
    // or preload here, since misconfiguring those is hard to undo.
    if (process.env.NODE_ENV === "production") {
      securityHeaders.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000",
      });
    }

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
