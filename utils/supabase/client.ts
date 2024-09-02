import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/types/supabase/database";
import type { SupabaseClient } from "@supabase/supabase-js";

const createClient: () => SupabaseClient<Database> = () =>
    createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
const supabaseClient = createClient();

export default supabaseClient;
export { createClient };
