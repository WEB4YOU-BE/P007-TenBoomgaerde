"use server";

import createClient from "@/utils/supabase/server";
import { endOfWeek, startOfWeek } from "date-fns";

const getDatesForThisWeek = () => {
    const today = new Date();
    const start = startOfWeek(today, { weekStartsOn: 1 });
    const end = endOfWeek(today, { weekStartsOn: 1 });
    return { end, start };
};
export const fetchApprovedReservationsThisWeek = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("reservations")
        .select()
        .eq("status", "goedgekeurd")
        .gte("start_date", getDatesForThisWeek().start.toISOString())
        .lte("start_date", getDatesForThisWeek().end.toISOString())
        .order("start_date", { ascending: true });
    if (error) throw error;
    return data;
};

const getDatesForThisMonth = () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return { end, start };
};
export const fetchApprovedReservationsThisMonth = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("reservations")
        .select()
        .eq("status", "goedgekeurd")
        .gte("start_date", getDatesForThisMonth().start.toISOString())
        .lte("start_date", getDatesForThisMonth().end.toISOString())
        .order("start_date", { ascending: true });
    if (error) throw error;
    return data;
};

const getDatesForPreviousMonth = () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const end = new Date(today.getFullYear(), today.getMonth(), 0);
    return { end, start };
};
export const fetchApprovedReservationsPreviousMonth = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("reservations")
        .select()
        .eq("status", "goedgekeurd")
        .gte("start_date", getDatesForPreviousMonth().start.toISOString())
        .lte("start_date", getDatesForPreviousMonth().end.toISOString())
        .order("start_date", { ascending: true });
    if (error) throw error;
    return data;
};
