import React from "react";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

interface LoginComponentProtectionProps {
    children: React.ReactNode;
}

export default async function LoginComponentProtection({children}: LoginComponentProtectionProps) {
    const supabase = createServerComponentClient({cookies})

    const {data: {user}} = await supabase.auth.getUser()
    if (!user) return undefined;

    return <>{children}</>
}