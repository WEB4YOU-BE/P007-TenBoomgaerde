"use server";

import { formatISO } from "date-fns";

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

export const fetchAllOrganizations = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("organizations").select();
    if (error) throw error;
    return data;
};

export const addReservation = async ({
    reservation,
}: {
    reservation: TablesInsert<"reservations">;
}) => {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    const reservations = await fetchAllReservations();
    const latestReservationNumber = reservations.reduce(
        (acc, cur) =>
            cur.reservation_number > acc ? cur.reservation_number : acc,
        -1
    );
    const { error } = await supabase.from("reservations").insert({
        access_code: undefined,
        end_date: formatISO(reservation.end_date || new Date(), {
            representation: "date",
        }),
        end_hour: reservation.end_hour,
        gefactureerd: false,
        id: undefined,
        organizations_id: reservation.organizations_id,
        product_id: undefined,
        remarks: reservation.remarks,
        reservation_number: latestReservationNumber + 1,
        reservation_year: formatISO(reservation.start_date || new Date(), {
            representation: "date",
        }),
        room_id: reservation.room_id,
        start_date: formatISO(reservation.start_date || new Date(), {
            representation: "date",
        }),
        start_hour: reservation.start_hour,
        status: "in afwachting",
        user_id: user.data.user?.id,
    });
    if (error) throw error;
    return;
};
