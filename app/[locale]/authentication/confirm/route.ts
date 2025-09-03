import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import createClient from "@/utils/supabase/server";

export const GET = async (request: NextRequest) => {
    const url = new URL(request.url);
    const type = url.searchParams.get("type") as EmailOtpType | null;
    const token = url.searchParams.get("token");
    const redirect = url.searchParams.get("redirect");

    if (!type || !token) {
        url.pathname = "/";
        url.search = "";
        url.searchParams.set("error", "AuthenticationConfirm");
        return NextResponse.redirect(url);
    }

    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type,
    });
    if (error) throw error;

    return NextResponse.redirect(redirect ?? "/");
};
