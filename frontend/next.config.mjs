/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for development warnings
  reactStrictMode: true,

  // Image optimization config
  images: {
    // Add your external image domains here if using remote images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
    ],
    // Supported formats for optimization
    formats: ["image/avif", "image/webp"],
  },

  // Environment variables exposed to the browser
  env: {
    // The URL of your backend API server
    // Change this to your actual backend URL when deploying
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  },

  // HTTP headers for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  // Enable compression
  compress: true,

  // Optimize bundle
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
