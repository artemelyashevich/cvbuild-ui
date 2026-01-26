import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: {
        appIsrStatus: false,
        buildActivity: false,
    },
    experimental: {
        devOverlay: false,
    }
};

export default nextConfig;