import NextBundleAnalyzer from "@next/bundle-analyzer";
import VercelToolbar from "@vercel/toolbar/plugins/next";
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import("next").NextConfig} */
const config = {
    compiler: { removeConsole: process.env.NODE_ENV === "production" },
    trailingSlash: true,
    turbopack: {},
};

const withVercelToolbar = VercelToolbar();
const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});
const withNextIntl = createNextIntlPlugin();

const plugins = [withVercelToolbar, withBundleAnalyzer, withNextIntl];
const pluginAppliedConfig = plugins.reduce(
    (config, plugin) => plugin(config),
    config
);

export default pluginAppliedConfig;
