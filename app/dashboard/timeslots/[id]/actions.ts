"use server";

import type { TablesUpdate } from "@/types/supabase/database";

import createClient from "@/utils/supabase/server";

export const getTimeslotById = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("timeslots")
        .select()
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
};

export const updateTimeslotById = async ({
    id,
    timeslot,
}: {
    id: string;
    timeslot: TablesUpdate<"timeslots">;
}) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("timeslots")
        .update(timeslot)
        .eq("id", id);
    if (error) throw error;
    return data;
};
