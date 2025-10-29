import type { NextProxy } from "next/server";

import { pluginI18N as i18n, pluginSupabase as SB } from "@/proxies/plugins";
import { default as pluginStack } from "@/proxies/stack";

const proxy: NextProxy = async (request, event) => {
    const plugins = [SB, i18n];
    const stackFactory = pluginStack({ event, plugins, request });
    const stack = await stackFactory;
    return await stack(request, event);
};
export default proxy;
