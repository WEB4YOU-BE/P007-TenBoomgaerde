"use server";

import createClient from "@/utils/supabase/server";
import { add } from "date-fns";

export const fetchReservationsToBeReviewed = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("reservations")
        .select()
        .eq("status", "in afwachting")
        .order("start_date", { ascending: true });
    if (error) throw error;
    return data;
};
export const fetchReservationsToBeInvoiced = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("reservations")
        .select()
        .eq("status", "goedgekeurd")
        .eq("gefactureerd", "FALSE")
        .order("start_date", { ascending: true });
    if (error) throw error;
    return data;
};

export const fetchReservationsToBeReviewedCount = async () => {
    const supabase = createClient();
    const { count, error } = await supabase
        .from("reservations")
        .select("id", { count: "exact" })
        .eq("status", "in afwachting");
    if (error) throw error;
    return count ?? 0;
};
export const fetchReservationsToBeInvoicedCount = async () => {
    const supabase = createClient();
    const { count, error } = await supabase
        .from("reservations")
        .select("id", { count: "exact" })
        .eq("status", "goedgekeurd")
        .eq("gefactureerd", "FALSE");
    if (error) throw error;
    return count ?? 0;
};

export const fetchReservationsThisWeek = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("reservations")
        .select()
        .gte("start_date", new Date().toISOString())
        .lte("end_date", add(new Date(), { days: 7 }).toISOString())
        .order("start_date", { ascending: true });
    if (error) throw error;
    return data;
};
export const fetchReservationsThisMonth = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("reservations")
        .select()
        .gte("start_date", new Date().toISOString())
        .lte("end_date", add(new Date(), { months: 1 }).toISOString())
        .order("start_date", { ascending: true });
    if (error) throw error;
    return data;
};

export const fetchReservationsThisWeekCount = async () => {
    const supabase = createClient();
    const { count, error } = await supabase
        .from("reservations")
        .select("id", { count: "exact" })
        .gte("start_date", new Date().toISOString())
        .lte("end_date", add(new Date(), { days: 7 }).toISOString());
    if (error) throw error;
    return count ?? 0;
};
export const fetchReservationsThisMonthCount = async () => {
    const supabase = createClient();
    const { count, error } = await supabase
        .from("reservations")
        .select("id", { count: "exact" })
        .gte("start_date", new Date().toISOString())
        .lte("end_date", add(new Date(), { months: 1 }).toISOString());
    if (error) throw error;
    return count ?? 0;
};
