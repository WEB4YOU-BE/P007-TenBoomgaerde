import type { NextFetchEvent, NextRequest } from "next/server";
import type { NextMiddlewareResult } from "next/dist/server/web/types";

import type { Plugin } from "@/types/middleware/plugin";

import { BLOB, DATA, getCSP, SELF, UNSAFE_INLINE } from "csp-header";
import {
    presetGoogleAnalytics,
    presetGoogleTagManager,
    presetVercelSpeedInsights,
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
            directives: {
                "default-src": [SELF],

                "style-src": [SELF, UNSAFE_INLINE],
                "font-src": [SELF],

                "script-src": [SELF, UNSAFE_INLINE],
                "connect-src": [
                    SELF,
                    ...(process.env.NODE_ENV === "development"
                        ? ["http://localhost:43214"]
                        : []),
                ],

                "img-src": [SELF, DATA, BLOB],
                "frame-src": [SELF],

                "block-all-mixed-content": true,
                "upgrade-insecure-requests":
                    process.env.NODE_ENV === "production",
            },
            presets: [
                presetVercelToolbar,
                presetVercelSpeedInsights,
                presetGoogleTagManager,
                presetGoogleAnalytics,
            ],
        });

        request.headers.set("Content-Security-Policy", csp);
        request.headers.set("x-nonce", hash);

        const response = await next(request, event);

        response?.headers?.set("Content-Security-Policy", csp);
        response?.headers?.set("x-nonce", hash);

        return response;
    };
export default plugin;
