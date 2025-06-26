"use server";

import createClient from "@/utils/supabase/server";

export const fetchHalls = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("halls").select();
    if (error) throw error;
    return data;
};
