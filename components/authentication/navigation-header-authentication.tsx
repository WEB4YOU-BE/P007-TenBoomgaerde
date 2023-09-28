import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import LogoutButton from "@/components/authentication/LogoutButton";
import NavigationHeaderLink from "@/components/navigation/navigation-header-link";
import LoginButton from "@/components/authentication/LoginButton";
import AdminComponentProtection from "@/components/authentication/admin-component-protection";
import LoginComponentProtection from "@/components/authentication/login-component-protection";

export const dynamic = 'force-dynamic'

export default async function NavigationHeaderAuthentication() {
    const supabase = createServerComponentClient({cookies})
    const {data: {user}} = await supabase.auth.getUser()

    return user
        ? <NavigationIsLogedIn/>
        : <NavigationIsLogedOut/>
}


async function NavigationIsLogedIn() {
    return <div className={"flex flex-row-reverse gap-2"}>
        <LogoutButton/>
        <AdminComponentProtection><NavigationHeaderLink href={"/dashboard"}>Dashboard</NavigationHeaderLink></AdminComponentProtection>
        <LoginComponentProtection><NavigationHeaderLink href={"/klant"}>Jouw overzicht</NavigationHeaderLink></LoginComponentProtection>
    </div>
}

async function NavigationIsLogedOut() {
    return <LoginButton/>
}