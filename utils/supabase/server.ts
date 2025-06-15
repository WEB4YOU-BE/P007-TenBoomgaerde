import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "@/types/supabase/database";

const createClient: () => SupabaseClient<Database> = () =>
    createServerClient<Database>(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll: async () => (await cookies()).getAll(),
                setAll: (cookiesToSet) => {
                    try {
                        cookiesToSet.forEach(async (cookie) =>
                            (await cookies()).set(cookie)
                        );
                    } catch (error) {
                        console.error(error);
                    }
                },
            },
        }
    );
export default createClient;
