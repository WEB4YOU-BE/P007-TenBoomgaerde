import { endOfWeek, startOfWeek } from "date-fns";

import createClient from "@/utils/supabase/client";

interface GetReservationCountForThisWeekProps {
    signal: AbortSignal;
}
const getReservationCountForThisWeek = async ({
    signal,
}: GetReservationCountForThisWeekProps) => {
    const supabase = createClient();
    const now = new Date();
    const firstDay = startOfWeek(now, { weekStartsOn: 1 });
    const lastDay = endOfWeek(now, { weekStartsOn: 1 });

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

export default getReservationCountForThisWeek;
