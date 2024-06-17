import withVercelToolbar from "@vercel/toolbar/plugins/next";

/** @type {import("next").NextConfig} */
const nextConfig = {
    trailingSlash: true,
    experimental: {
        instrumentationHook: true,
    }
};

export default withVercelToolbar()(nextConfig);
