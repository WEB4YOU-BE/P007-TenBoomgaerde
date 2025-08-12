import createClient from "@/utils/supabase/client";

interface GetReservationCountToInvoiceProps {
    signal: AbortSignal;
}

const getReservationCountToInvoice = async ({
    signal,
}: GetReservationCountToInvoiceProps) => {
    const supabase = createClient();
    const { count, error } = await supabase
        .from("reservations")
        .select("id", { count: "exact", head: true })
        .eq("status", "ACCEPTED")
        .eq("invoiced", false)
        .abortSignal(signal);
    if (error && error instanceof Error) throw error;
    return count ?? 0;
};

export default getReservationCountToInvoice;
