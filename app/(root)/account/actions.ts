"use server";

import type { TablesInsert } from "@/types/supabase/database";

import createClient from "@/utils/supabase/server";

export const updateUser = async ({ user }: { user: TablesInsert<"users"> }) => {
    const supabase = createClient();
    const { error } = await supabase
        .from("users")
        .update(user)
        .eq("id", user.id);
    if (error) throw error;
    return;
};
