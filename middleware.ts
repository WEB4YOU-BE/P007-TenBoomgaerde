import type { NextMiddleware } from "next/server";

import { default as pluginStack } from "./middlewares/stack";
import { pluginContentSecurityPolicy as CSP } from "./middlewares";

const middleware: NextMiddleware = async (request, event) => {
    const plugins = [CSP];
    const stack = await pluginStack({ plugins, request, event });
    return await stack(request, event);
};
export default middleware;

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
