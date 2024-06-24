"use server";

import { createClient } from "@/utils/supabase/server";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";

export const signUpWithEmailCredentials = async (
  credentials: SignUpWithPasswordCredentials,
) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp(credentials);
  if (error) throw error;
  return data;
};
