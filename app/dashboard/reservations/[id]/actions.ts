"use server";

import type { TablesUpdate } from "@/types/supabase/database";

import createClient from "@/utils/supabase/server";

export const getReservationById = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("reservations")
        .select()
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
};
export const getTimeslotById = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("bloks")
        .select()
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
};
export const getHallById = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("rooms")
        .select()
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
};
export const getUserById = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
};
export const getOrganizationById = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("organizations")
        .select()
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
};

export const updateReservationById = async ({
    id,
    reservation,
}: {
    id: string;
    reservation: TablesUpdate<"reservations">;
}) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("reservations")
        .update(reservation)
        .eq("id", id);
    if (error) throw error;
    return data;
};
