import { createClient } from "@/utils/supabase/server";

export const fetchProducts = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("products").select();
  if (error) throw error;
  return data;
};
