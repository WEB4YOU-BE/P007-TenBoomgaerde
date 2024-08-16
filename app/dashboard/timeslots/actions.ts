import { createClient } from "@/utils/supabase/server";

export const fetchTimeslots = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("bloks").select();
  if (error) throw error;
  return data;
};
