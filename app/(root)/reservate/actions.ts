"use server";

import { TablesInsert } from "@/types/supabase/database";
import createClient from "@/utils/supabase/server";

export const fetchAllHalls = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("rooms").select();
    if (error) throw error;
    return data;
};

export const addReservation = async ({
    reservation,
}: {
    reservation: TablesInsert<"reservations">;
}) => {
    const supabase = createClient();
    const { error } = await supabase.from("reservations").insert(reservation);
    if (error) throw error;
    return;
};
