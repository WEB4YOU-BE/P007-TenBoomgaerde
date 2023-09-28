import * as React from "react"

import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import NavigationSidebarAuthentication from "@/components/authentication/navigation-sidebar-authentication";
import {LayoutDashboard, List} from "lucide-react";
import NavigationSidebarLink from "@/components/navigation/navigation-sidebar-link";
import LoginRouteProtection from "@/components/authentication/login-route-protection";
import AdminComponentProtection from "@/components/authentication/admin-component-protection";
import LoginComponentProtection from "@/components/authentication/login-component-protection";

export const dynamic = 'force-dynamic'

interface LayoutProps {
    children: React.ReactNode;
}

export default function PublicNavigationLayoutDashboard({children}: LayoutProps) {
    return <LoginRouteProtection>
        <div className={"flex flex-col md:flex-row"}>
            <NavigationSidebar authNode={<NavigationSidebarAuthentication/>}>
                <LoginComponentProtection><NavigationSidebarLink href={"/klant"}><List/><span>Mijn overzicht</span></NavigationSidebarLink></LoginComponentProtection>
                <AdminComponentProtection><NavigationSidebarLink href={"/dashboard"}><LayoutDashboard/><span>Dashboard</span></NavigationSidebarLink></AdminComponentProtection>
            </NavigationSidebar>
            <div className={"w-full"}>
                {children}
            </div>
        </div>
    </LoginRouteProtection>
}