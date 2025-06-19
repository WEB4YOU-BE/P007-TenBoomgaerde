"use server";

import createClient from "@/utils/supabase/server";

export const fetchReservations = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("reservations").select();
    if (error) throw error;
    return data;
};
