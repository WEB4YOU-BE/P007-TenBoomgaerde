import type { NextMiddlewareResult } from "next/dist/server/web/types";

import createMiddleware from "next-intl/middleware";
import {
    type NextFetchEvent,
    type NextRequest,
    NextResponse,
} from "next/server";

import type { Plugin } from "@/types/middleware/plugin";

import routing from "@/i18n/routing";

const plugin: Plugin =
    (next) =>
    async (
        request: NextRequest,
        event: NextFetchEvent
    ): Promise<NextMiddlewareResult> => {
        const excludedRoutes = [
            /^\/_next\//,
            /^\/_vercel\//,
            /^\/favicon\.ico$/,
            /^\/documents\//,
        ];
        const pathname = request.nextUrl.pathname;
        if (excludedRoutes.some((regex) => regex.test(pathname)))
            return next(request, event);

        const result = createMiddleware(routing)(request);
        if (result instanceof NextResponse) return result;

        return next(request, event);
    };
export default plugin;
