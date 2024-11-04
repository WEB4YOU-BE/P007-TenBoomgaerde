"use server";

import { TablesInsert } from "@/types/supabase/database";
import createClient from "@/utils/supabase/server";

export const fetchAllHalls = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("rooms").select();
    if (error) throw error;
    return data;
};

export const fetchAllReservations = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("reservations").select();
    if (error) throw error;
    return data;
};

export const fetchAllTimeframes = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("bloks")
        .select()
        .order("start_hour");
    if (error) throw error;
    return data;
};

export const addReservation = async ({
    reservation,
}: {
    reservation: TablesInsert<"reservations">;
}) => {
    console.dir(reservation, { depth: null });
    // const supabase = createClient();
    // const { error } = await supabase.from("reservations").insert(reservation);
    // if (error) throw error;
    return;
};
