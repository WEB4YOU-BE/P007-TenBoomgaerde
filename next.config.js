import withVercelToolbar from "@vercel/toolbar/plugins/next";

/** @type {import("next").NextConfig} */
const nextConfig = {
    experimental: {
        instrumentationHook: true,
    },
    trailingSlash: true,
};

export default withVercelToolbar()(nextConfig);
