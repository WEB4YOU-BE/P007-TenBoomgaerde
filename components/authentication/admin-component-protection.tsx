import React from "react";
import { createClient } from "@/utils/supabase/server";
import {cookies} from "next/headers";

interface AdminComponentProtectionProps {
    children: React.ReactNode;
}

export default async function AdminComponentProtection({children}: AdminComponentProtectionProps) {
    const supabase = createClient()

    const {data: {user}} = await supabase.auth.getUser()
    if (!user) return undefined;

    const {data: adminIsLoggedIn} = await supabase.rpc("is_admin", {"user_id": user.id})
    if (!adminIsLoggedIn) return undefined;

    return <>{children}</>
}