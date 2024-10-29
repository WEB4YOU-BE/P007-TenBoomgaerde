import withVercelToolbar from "@vercel/toolbar/plugins/next";

/** @type {import("next").NextConfig} */
const nextConfig = {
    trailingSlash: true,
};

export default withVercelToolbar()(nextConfig);
