import { endOfMonth, startOfMonth } from "date-fns";

import createClient from "@/utils/supabase/client";

interface GetReservationCountForThisMonthProps {
    signal: AbortSignal;
}

const getReservationCountForThisMonth = async ({
    signal,
}: GetReservationCountForThisMonthProps) => {
    const supabase = createClient();
    const now = new Date();
    const firstDay = startOfMonth(now);
    const lastDay = endOfMonth(now);

    const { count, error } = await supabase
        .from("reservations")
        .select("id", { count: "exact", head: true })
        .eq("status", "goedgekeurd")
        .gte("start", firstDay.toISOString())
        .lte("start", lastDay.toISOString())
        .gte("end", firstDay.toISOString())
        .lte("end", lastDay.toISOString())
        .abortSignal(signal);
    if (error && error instanceof Error) throw error;
    return count ?? 0;
};

export default getReservationCountForThisMonth;
