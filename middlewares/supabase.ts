import type { MiddlewareFactory } from "@/types/middleware/middlewareFactory";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

export const withSupabaseAuth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    if (["/_next"].some((regex) => pathname.startsWith(regex)))
      return next(request, _next);

    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (key) => request.cookies.get(key)?.value,
          set: (key: string, value: string, options: CookieOptions) => {
            request.cookies.set({ key, value, ...options });
            response.cookies.set({ key, value, ...options });
          },
          remove: (key: string, options: CookieOptions) => {
            request.cookies.set({ key, value: "", ...options });
            response.cookies.set({ key, value: "", ...options });
          },
        },
      },
    );

    const { data } = await supabase.auth.getUser();

    if (!!data.user)
      if (
        ["/authentication/"].some((regex) =>
          request.nextUrl.pathname.startsWith(regex),
        )
      ) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
      }

    return response;
  };
};
