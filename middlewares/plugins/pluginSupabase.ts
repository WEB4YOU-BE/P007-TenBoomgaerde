import {
    NextResponse,
    type NextFetchEvent,
    type NextRequest,
} from "next/server";
import type { NextMiddlewareResult } from "next/dist/server/web/types";

import type { Plugin } from "@/types/middleware/plugin";
import type { Database } from "@/types/supabase/database";

import { createServerClient } from "@supabase/ssr";

const plugin: Plugin =
    (next) =>
    async (
        request: NextRequest,
        event: NextFetchEvent
    ): Promise<NextMiddlewareResult> => {
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

        if (!!user) {
            if (request.nextUrl.pathname === "/authentication/sign-out/") {
                console.log("signout");
                await supabase.auth.signOut();
                const url = request.nextUrl.clone();
                url.pathname = "/authentication/";
                return NextResponse.redirect(url);
            }
            if (
                ["/authentication/"].some((regex) =>
                    request.nextUrl.pathname.startsWith(regex)
                )
            ) {
                const url = request.nextUrl.clone();
                url.pathname = "/";
                return NextResponse.redirect(url);
            }
        }

        if (!user)
            if (
                ["/account/", "/dashboard/"].some((regex) =>
                    request.nextUrl.pathname.startsWith(regex)
                )
            ) {
                const url = request.nextUrl.clone();
                url.pathname = "/authentication/";
                return NextResponse.redirect(url);
            }

        return next(request, event);
    };
export default plugin;
