import { withPayload } from "@payloadcms/next/withPayload"

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@payloadcms/db-postgres", "pg", "cloudflare:sockets"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8181",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vitrine.imobifolio.com.br",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.externals = [...(config.externals || []), "cloudflare:sockets"]
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "cloudflare:sockets": false,
    }
    return config
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
