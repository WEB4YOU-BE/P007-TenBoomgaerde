import createClient from "@/utils/supabase/client";

interface GetReservationCountPendingProps {
    signal: AbortSignal;
}

const getReservationCountPending = async ({
    signal,
}: GetReservationCountPendingProps) => {
    const supabase = createClient();
    const { count, error } = await supabase
        .from("reservations")
        .select("id", { count: "exact", head: true })
        .eq("status", "in afwachting")
        .abortSignal(signal);
    if (error && error instanceof Error) throw error;
    return count ?? 0;
};

export default getReservationCountPending;
