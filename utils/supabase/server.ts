import { cookies } from "next/headers";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { Database } from "@/types/supabase/database.types";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (key: string) => cookieStore.get(key)?.value,
        set: (key: string, value: string, options: CookieOptions) => {
          cookieStore.set({ name: key, value, ...options });
        },
        remove: (key: string, options: CookieOptions) => {
          cookieStore.set({ name: key, value: "", ...options });
        },
      },
      auth: { flowType: "pkce" },
    },
  );
}
