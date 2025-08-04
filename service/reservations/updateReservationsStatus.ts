import { TablesUpdate } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface UpdateReservationsStatusProps {
    reservationIds: NonNullable<TablesUpdate<"reservations">["id"]>[];
    signal: AbortSignal;
    status: TablesUpdate<"reservations">["status"];
}
type UpdateReservationsStatusResponse = Awaited<
    ReturnType<typeof updateReservationsStatus>
>;
const updateReservationsStatus = async ({
    reservationIds,
    signal,
    status,
}: UpdateReservationsStatusProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("reservations")
        .update({ status })
        .in("id", reservationIds)
        .abortSignal(signal);

    if (error && error instanceof Error) throw error;

    return data;
};

export default updateReservationsStatus;
export type { UpdateReservationsStatusResponse };
