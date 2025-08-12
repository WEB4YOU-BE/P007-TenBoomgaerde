import { TablesUpdate } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface UpdateOrganisationsStatusProps {
    organisationIds: NonNullable<TablesUpdate<"organizations">["id"]>[];
    signal: AbortSignal;
    status: TablesUpdate<"organizations">["acceptance_status"];
}
type UpdateOrganisationsStatusResponse = Awaited<
    ReturnType<typeof updateOrganisationsStatus>
>;
const updateOrganisationsStatus = async ({
    organisationIds,
    signal,
    status,
}: UpdateOrganisationsStatusProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("organizations")
        .update({ acceptance_status: status })
        .in("id", organisationIds)
        .abortSignal(signal);

    if (error && error instanceof Error) throw error;

    return data;
};

export default updateOrganisationsStatus;
export type { UpdateOrganisationsStatusResponse };
