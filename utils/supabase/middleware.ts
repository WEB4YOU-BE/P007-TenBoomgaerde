import type { NextRequest, NextResponse } from "next/server";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { Database } from "@/types/supabase/database.types";

export function createClient(request: NextRequest, response: NextResponse) {
  return createServerClient<Database>(
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
}
