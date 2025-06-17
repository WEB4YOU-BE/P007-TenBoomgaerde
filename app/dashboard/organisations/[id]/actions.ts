"use server";

import type { TablesUpdate } from "@/types/supabase/database";

import createClient from "@/utils/supabase/server";

export const getOrganisationById = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("organizations")
        .select()
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
};

export const updateOrganisationById = async ({
    id,
    organisation,
}: {
    id: string;
    organisation: TablesUpdate<"organizations">;
}) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("organizations")
        .update(organisation)
        .eq("id", id);
    if (error) throw error;
    return data;
};
