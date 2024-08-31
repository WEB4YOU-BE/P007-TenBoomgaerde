import type { NextFetchEvent, NextRequest } from "next/server";
import type { NextMiddlewareResult } from "next/dist/server/web/types";

import type { Plugin } from "@/types/middleware/plugin";

import { getCSP } from "csp-header";
import {
    presetNextJS,
    presetVercelToolbar,
} from "@/utils/contentSecurityPolicy";

const plugin: Plugin =
    (next) =>
    async (
        request: NextRequest,
        event: NextFetchEvent
    ): Promise<NextMiddlewareResult> => {
        const hash = Buffer.from(crypto.randomUUID()).toString("base64");
        const csp = getCSP({
            presets: [presetNextJS, presetVercelToolbar(hash)],
        });

        request.headers.set("Content-Security-Policy", csp);
        request.headers.set("x-nonce", hash);

        const response = await next(request, event);

        response?.headers?.set("Content-Security-Policy", csp);
        response?.headers?.set("x-nonce", hash);

        return response;
    };
export default plugin;
