import type { MiddlewareFactory } from "@/types/middleware/middlewareFactory";
import { createClient } from "@/utils/supabase/middleware";
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

    const supabase = createClient(request, response);
    const { data } = await supabase.auth.getUser();

    console.log(request.nextUrl.pathname);

    if (!!data.user) {
      if (request.nextUrl.pathname === "/authentication/sign-out/") {
        console.log("signout");
        await supabase.auth.signOut();
        const url = request.nextUrl.clone();
        url.pathname = "/authentication/";
        return NextResponse.redirect(url);
      }
      if (
        ["/authentication/"].some((regex) =>
          request.nextUrl.pathname.startsWith(regex),
        )
      ) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }

    if (!data.user)
      if (
        ["/account/", "/dashboard/"].some((regex) =>
          request.nextUrl.pathname.startsWith(regex),
        )
      ) {
        const url = request.nextUrl.clone();
        url.pathname = "/authentication/";
        return NextResponse.redirect(url);
      }

    return response;
  };
};
