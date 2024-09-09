import type { NextMiddleware } from "next/server";

import {
    pluginContentSecurityPolicy as CSP,
    pluginSupabase as SB,
} from "./middlewares";
import { default as pluginStack } from "./middlewares/stack";

const middleware: NextMiddleware = async (request, event) => {
    const plugins = [CSP, SB];
    const stack = await pluginStack({ event, plugins, request });
    return await stack(request, event);
};
export default middleware;

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
