import { createClient } from "@/utils/supabase/server";

export const fetchHalls = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("rooms").select();
  if (error) throw error;
  return data;
};
