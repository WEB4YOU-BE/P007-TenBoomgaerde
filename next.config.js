import NextBundleAnalyzer from "@next/bundle-analyzer";
import VercelToolbar from "@vercel/toolbar/plugins/next";

/** @type {import("next").NextConfig} */
const config = {
    experimental: {
        turbo: {},
    },
    trailingSlash: true,
};

const withVercelToolbar = VercelToolbar();
const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

const plugins = [withVercelToolbar, withBundleAnalyzer];
const pluginAppliedConfig = plugins.reduce(
    (config, plugin) => plugin(config),
    config
);

export default pluginAppliedConfig;
