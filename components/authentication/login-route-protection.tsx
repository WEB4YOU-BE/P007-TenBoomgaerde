import React from "react";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

interface LoginRouteProtectionProps {
    children: React.ReactNode;
}

export default async function LoginRouteProtection({children}: LoginRouteProtectionProps) {
    const supabase = createServerComponentClient({cookies})

    const {data: {user}} = await supabase.auth.getUser()
    if (!user) return redirect("/login?error=Meld%20je%20aan");

    return <>{children}</>
}