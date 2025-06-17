import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import createClient from "@/utils/supabase/server";

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
    const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type,
    });
    if (error) throw error;
    to.pathname = redirect || "/account/";
    return NextResponse.redirect(to);
};
