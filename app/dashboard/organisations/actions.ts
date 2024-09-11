import createClient from "@/utils/supabase/server";

export const fetchOrganizations = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("organizations").select();
    if (error) throw error;
    return data;
};
