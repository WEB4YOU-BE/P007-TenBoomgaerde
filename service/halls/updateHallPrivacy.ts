import { TablesUpdate } from "@/types/supabase/database";
import createClient from "@/utils/supabase/client";

interface UpdateHallPrivacyProps {
    hallIds: NonNullable<TablesUpdate<"halls">["id"]>[];
    isPrivate: TablesUpdate<"halls">["is_private"];
    signal: AbortSignal;
}

const updateHallPrivacy = async ({
    hallIds,
    isPrivate,
    signal,
}: UpdateHallPrivacyProps) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("halls")
        .update({ is_private: isPrivate })
        .in("id", hallIds)
        .abortSignal(signal);

    if (error && error instanceof Error) throw error;
    return data;
};

export default updateHallPrivacy;
export type { UpdateHallPrivacyProps };
