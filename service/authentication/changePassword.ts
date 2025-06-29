import { UserAttributes } from "@supabase/supabase-js";

import createClient from "@/utils/supabase/client";

interface ChangePasswordProps {
    password: UserAttributes["password"];
}
const changePassword = async ({ password }: ChangePasswordProps) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error && error instanceof Error) throw error;
    return data;
};

export default changePassword;
