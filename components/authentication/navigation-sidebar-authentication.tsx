import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import LogoutButton from "@/components/authentication/LogoutButton";
import NavigationSidebarLink from "@/components/navigation/navigation-sidebar-link";

export default async function NavigationSidebarAuthentication() {
    const supabase = createServerComponentClient({cookies})
    const {data: {user}} = await supabase.auth.getUser()

    return user
        ? <NavigationIsLogedIn/>
        : <NavigationIsLogedOut/>
}

async function NavigationIsLogedIn() {
    return <div className={"flex flex-col-reverse gap-2"}>
        <LogoutButton/>
        <NavigationSidebarLink href={"/dashboard"}>Accountinstellingen</NavigationSidebarLink>
    </div>
}

async function NavigationIsLogedOut() {
    return <NavigationSidebarLink href={"/login"}>Log in</NavigationSidebarLink>
}