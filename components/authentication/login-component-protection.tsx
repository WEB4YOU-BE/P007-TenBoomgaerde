import React from "react";
import { createClient } from "@/utils/supabase/server";
import {cookies} from "next/headers";

interface LoginComponentProtectionProps {
    children: React.ReactNode;
}

export default async function LoginComponentProtection({children}: LoginComponentProtectionProps) {
    const supabase = createClient()

    const {data: {user}} = await supabase.auth.getUser()
    if (!user) return undefined;

    return <>{children}</>
}