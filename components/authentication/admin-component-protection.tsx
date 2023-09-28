import React from "react";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

interface AdminComponentProtectionProps {
    children: React.ReactNode;
}

export default async function AdminComponentProtection({children}: AdminComponentProtectionProps) {
    const supabase = createServerComponentClient({cookies})

    const {data: {user}} = await supabase.auth.getUser()
    if (!user) return undefined;

    const {data: adminIsLoggedIn} = await supabase.rpc("is_admin", {"user_id": user.id})
    if (!adminIsLoggedIn) return undefined;

    return <>{children}</>
}