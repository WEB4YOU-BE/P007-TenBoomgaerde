import type { NextMiddleware } from "next/server";

import {
    pluginI18N as i18n,
    pluginSupabase as SB,
} from "@/middlewares/plugins";
import { default as pluginStack } from "@/middlewares/stack";

const middleware: NextMiddleware = async (request, event) => {
    const plugins = [SB, i18n];
    const stackFactory = pluginStack({ event, plugins, request });
    const stack = (await stackFactory) as NextMiddleware;
    return await stack(request, event);
};
export default middleware;
