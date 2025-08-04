import { TablesUpdate } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface UpdateUsersAdminProps {
    isAdmin: TablesUpdate<"users">["is_admin"];
    signal: AbortSignal;
    userIds: NonNullable<TablesUpdate<"users">["id"]>[];
}

const updateUsersAdmin = async ({
    isAdmin,
    signal,
    userIds,
}: UpdateUsersAdminProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("users")
        .update({ is_admin: isAdmin })
        .in("id", userIds)
        .abortSignal(signal);
    if (error && error instanceof Error) throw error;
    return data;
};

export default updateUsersAdmin;
export type { UpdateUsersAdminProps };
