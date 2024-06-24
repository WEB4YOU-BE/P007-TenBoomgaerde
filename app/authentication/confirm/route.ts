import { createClient } from "@/utils/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const to = request.nextUrl.clone();

  const type = searchParams.get("type") as EmailOtpType | null;
  const token = searchParams.get("token");
  const redirect = searchParams.get("redirect");
  to.searchParams.delete("type");
  to.searchParams.delete("token");
  to.searchParams.delete("redirect");

  if (!type || !token) {
    to.pathname = "/";
    to.searchParams.append("error", "AuthenticationConfirm");
    return NextResponse.redirect(to);
  }

  const supabase = createClient();
  const { error } = await supabase.auth.verifyOtp({ type, token_hash: token });
  if (error) throw error;
  to.pathname = redirect || "/";
  return NextResponse.redirect(to);
};
