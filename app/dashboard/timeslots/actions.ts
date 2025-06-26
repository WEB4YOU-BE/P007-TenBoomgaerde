"use server";

import createClient from "@/utils/supabase/server";

export const fetchTimeslots = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("timeslots").select();
    if (error) throw error;
    return data;
};
