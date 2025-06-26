"use server";

import createClient from "@/utils/supabase/server";

export const getTimeslotById = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("timeslots")
        .select("*")
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
};

export const getRenterById = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
};

export const getHallById = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("halls")
        .select("*")
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
};

export const getOrganizationById = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("organizations")
        .select("*")
        .eq("id", id);
    if (error) throw error;
    return data;
};
