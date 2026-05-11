import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
            },
            { protocol: "https", hostname: "img.clerk.com" }

        ]
    }
}

export default nextConfig
