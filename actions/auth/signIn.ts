"use server";

import { createClient } from "@/utils/supabase/server";
import type { SignInWithPasswordCredentials } from "@supabase/supabase-js";

export const SignInWithCredentials = async (
  credentials: SignInWithPasswordCredentials,
) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error) throw error;
  return data;
};
