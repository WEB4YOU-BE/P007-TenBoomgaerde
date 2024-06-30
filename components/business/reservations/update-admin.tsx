"use server";

import { createClient } from "@/utils/supabase/server";

interface IndexActionsProps {
  id: string;
  checked: boolean;
}

export async function UpdateAdmin({ id, checked }: IndexActionsProps) {
  const supabase = createClient();
  await supabase.from("users").update({ is_admin: checked }).eq("id", id);
}
