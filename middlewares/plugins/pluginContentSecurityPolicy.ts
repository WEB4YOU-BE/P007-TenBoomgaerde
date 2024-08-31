import type { NextFetchEvent, NextRequest } from "next/server";
import { getCSP } from "csp-header";

import type { Plugin } from "@/types/middleware/plugin";
import { NextMiddlewareResult } from "next/dist/server/web/types";

const plugin: Plugin =
    (next) =>
    async (
        request: NextRequest,
        event: NextFetchEvent
    ): Promise<NextMiddlewareResult> => {
        const hash = Buffer.from(crypto.randomUUID()).toString("base64");
        const csp = getCSP({});

        request.headers.set("Content-Security-Policy", csp);
        request.headers.set("x-nonce", hash);

        const response = await next(request, event);

        response?.headers?.set("Content-Security-Policy", csp);
        response?.headers?.set("x-nonce", hash);

        return response;
    };
export default plugin;
