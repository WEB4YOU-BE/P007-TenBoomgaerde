import { TablesUpdate } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface UpdateReservationsInvoicedProps {
    invoiced: TablesUpdate<"reservations">["invoiced"];
    reservationIds: NonNullable<TablesUpdate<"reservations">["id"]>[];
    signal: AbortSignal;
}
type UpdateReservationsInvoicedResponse = Awaited<
    ReturnType<typeof updateReservationsInvoiced>
>;
const updateReservationsInvoiced = async ({
    invoiced,
    reservationIds,
    signal,
}: UpdateReservationsInvoicedProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("reservations")
        .update({ invoiced })
        .in("id", reservationIds)
        .select("*")
        .abortSignal(signal);

    if (error && error instanceof Error) throw error;

    return data;
};

export default updateReservationsInvoiced;
export type { UpdateReservationsInvoicedResponse };
