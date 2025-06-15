"use server";

import type { TablesInsert } from "@/types/supabase/database";

import createClient from "@/utils/supabase/server";

export const createOrganisation = async ({
    organisation,
}: {
    organisation: TablesInsert<"organizations">;
}) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("organizations")
        .insert(organisation);
    if (error) throw error;
    return data;
};
