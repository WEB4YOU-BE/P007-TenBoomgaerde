import type { NextMiddleware } from "next/server";

import { pluginSupabase as SB } from "@/middlewares/plugins";
import { default as pluginStack } from "@/middlewares/stack";

const middleware: NextMiddleware = async (request, event) => {
    const plugins = [SB];
    const stackFactory = pluginStack({ event, plugins, request });
    const stack = (await stackFactory) as NextMiddleware;
    return await stack(request, event);
};
export default middleware;
