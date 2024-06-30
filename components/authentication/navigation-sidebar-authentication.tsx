import { createClient } from "@/utils/supabase/server";
import {cookies} from "next/headers";
import LogoutButton from "@/components/authentication/LogoutButton";
import NavigationSidebarLink from "@/components/navigation/navigation-sidebar-link";
import LoginButton from "@/components/authentication/LoginButton";
import {UserCircle} from "lucide-react";

export default async function NavigationSidebarAuthentication() {
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser()

    return user
        ? <NavigationIsLogedIn/>
        : <NavigationIsLogedOut/>
}

async function NavigationIsLogedIn() {
    return <div className={"flex flex-col-reverse gap-2"}>
        <LogoutButton/>
        <NavigationSidebarLink href={"/account"}><UserCircle/>Accountinstellingen</NavigationSidebarLink>
    </div>
}

async function NavigationIsLogedOut() {
    return <div className={"flex flex-col-reverse gap-2"}>
        <LoginButton/>
    </div>
}