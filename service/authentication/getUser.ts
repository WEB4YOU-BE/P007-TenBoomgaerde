import { AuthSessionMissingError } from "@supabase/supabase-js";

import createClient from "@/utils/supabase/client";

const getUser = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error && error instanceof AuthSessionMissingError) return null;
    if (error && error instanceof Error) throw error;
    if (data?.user === null) return null;
    return data.user;
};

export default getUser;
