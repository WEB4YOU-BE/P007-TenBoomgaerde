import React from "react";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {RedirectType} from "next/dist/client/components/redirect";

interface AdminRouteProtectionProps {
    children: React.ReactNode;
}

export default async function AdminRouteProtection({children}: AdminRouteProtectionProps) {
    const supabase = createServerComponentClient({cookies})

    const {data: {user}} = await supabase.auth.getUser()
    if (!user) return redirect("/login?error=Meld%20je%20aan");

    const {data: adminIsLoggedIn} = await supabase.rpc("is_admin", {"user_id": user.id})
    if (!adminIsLoggedIn) return redirect("/login?error=Meld%20je%20aan%20als%20administrator", RedirectType.replace)

    return <>{children}</>
}