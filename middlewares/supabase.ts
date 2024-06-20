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

    if (
      [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
      ].some((regex) => pathname.match(regex))
    )
      {
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
                get(name: string) {
                  return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                  request.cookies.set({
                    name,
                    value,
                    ...options,
                  });
                  response = NextResponse.next({
                    request: {
                      headers: request.headers,
                    },
                  });
                  response.cookies.set({
                    name,
                    value,
                    ...options,
                  });
                },
                remove(name: string, options: CookieOptions) {
                  request.cookies.set({
                    name,
                    value: "",
                    ...options,
                  });
                  response = NextResponse.next({
                    request: {
                      headers: request.headers,
                    },
                  });
                  response.cookies.set({
                    name,
                    value: "",
                    ...options,
                  });
                },
              },
            },
          );
        
          await supabase.auth.getUser();
        
          return response;
      }

    return next(request, _next);
  };
};
