import type { NextMiddlewareResult } from "next/dist/server/web/types";

import { createServerClient } from "@supabase/ssr";
import {
    type NextFetchEvent,
    type NextRequest,
    NextResponse,
} from "next/server";

import type { Plugin } from "@/types/middleware/plugin";
import type { Database } from "@/types/supabase/database";

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
        ];
        const pathname = request.nextUrl.pathname;
        if (excludedRoutes.some((regex) => regex.test(pathname)))
            return next(request, event);

        const userNotAllowedRegex =
            /(\/authentication\/(sign-in|sign-up|recover|confirm)\/)|(\/authentication\/$)/g;
        const publicNotAllowedRegex =
            /(\/authentication\/(sign-out|change-password)\/)|(\/account\/$)|(\/dashboard\/.*)|(\/reservate\/?)/g;

        const supabase = createServerClient<Database>(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_ANON_KEY,
            {
                cookies: {
                    getAll: () => request.cookies.getAll(),
                    setAll: (cookies) => {
                        for (const cookie of cookies)
                            request.cookies.set(cookie);
                    },
                },
            }
        );

        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (user) {
            if (userNotAllowedRegex.test(request.nextUrl.pathname)) {
                const url = request.nextUrl.clone();
                url.pathname = "/";
                return NextResponse.redirect(url);
            }
        }
        if (!user)
            if (publicNotAllowedRegex.test(request.nextUrl.pathname)) {
                const url = request.nextUrl.clone();
                url.pathname = "/authentication/";
                return NextResponse.redirect(url);
            }

        return next(request, event);
    };
export default plugin;
