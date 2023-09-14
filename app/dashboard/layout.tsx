import React from "react";
import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import NavigationSidebarAuthentication from "@/components/authentication/navigation-sidebar-authentication";
import NavigationSidebarLink from "@/components/navigation/navigation-sidebar-link";

export const dynamic = 'force-dynamic'

interface LayoutProps {
    children: React.ReactNode;
}

export default async function layout({children}: LayoutProps) {
    return <div className={"flex flex-col sm:flex-row"}>
        <NavigationSidebar authNode={<NavigationSidebarAuthentication/>}>
            <NavigationSidebarLink href={"/dashboard/zalen"}>Zalen</NavigationSidebarLink>
        </NavigationSidebar>
        <div className={"w-full"}>
            {children}
        </div>
    </div>
}