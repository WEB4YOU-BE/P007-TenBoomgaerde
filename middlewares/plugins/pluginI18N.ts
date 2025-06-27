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
        const result = createMiddleware(routing)(request);
        if (result instanceof NextResponse) return result;

        return next(request, event);
    };
export default plugin;
