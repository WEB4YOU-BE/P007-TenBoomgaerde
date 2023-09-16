import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import LogoutButton from "@/components/authentication/LogoutButton";
import NavigationHeaderLink from "@/components/navigation/navigation-header-link";
import LoginButton from "@/components/authentication/LoginButton";

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
        <NavigationHeaderLink href={"/dashboard"}>Dashboard</NavigationHeaderLink>
    </div>
}

async function NavigationIsLogedOut() {
    return <LoginButton/>
}