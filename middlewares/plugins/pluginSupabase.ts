import type { NextFetchEvent, NextRequest } from "next/server";
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
            { cookies: request.cookies }
        );

        await supabase.auth.getUser();

        return next(request, event);
    };
export default plugin;
