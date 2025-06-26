"use server";

import { formatISO } from "date-fns";

import type { Tables, TablesInsert } from "@/types/supabase/database";

import createClient from "@/utils/supabase/server";

export const fetchAllHalls = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("halls").select();
    if (error) throw error;
    return data;
};

export const fetchAllReservations = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("reservations").select();
    if (error) throw error;
    return data;
};

export const fetchLatestReservationNumber = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("reservations")
        .select("reservation_number", { count: "exact" })
        .order("reservation_number", { ascending: false })
        .single();
    if (error) throw error;
    return data?.reservation_number || 0;
};

export const fetchAllTimeframes = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("timeslots")
        .select()
        .order("start_time");
    if (error) throw error;
    return data;
};

export const fetchAllOrganizations = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("organizations").select();
    if (error) throw error;
    return data;
};

export const addReservation = async ({
    halls,
    reservation,
}: {
    halls: Tables<"halls">[];
    reservation: TablesInsert<"reservations">;
}) => {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    const latestReservationNumber = await fetchLatestReservationNumber();
    const { data: reservationData, error: reservationError } = await supabase
        .from("reservations")
        .insert({
            access_code: undefined,
            end: formatISO(reservation.end || new Date()),
            gefactureerd: false,
            id: undefined,
            organization_id: reservation.organization_id,
            product_id: undefined,
            remarks: reservation.remarks,
            reservation_number: latestReservationNumber + 1,
            reservation_year: formatISO(reservation.start || new Date(), {
                representation: "date",
            }),
            start: formatISO(reservation.start || new Date()),
            status: "in afwachting",
            user_id: user.data.user?.id,
        })
        .select()
        .single();
    if (reservationError) throw reservationError;
    if (!reservationData || !reservationData.id)
        throw new Error("Reservation insert failed");
    await Promise.all(
        halls.map((hall) =>
            supabase.from("reservation_halls").insert({
                hall_id: hall.id,
                reservation_id: reservationData.id,
            })
        )
    );
    return;
};
