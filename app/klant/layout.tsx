import * as React from "react"

import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import NavigationSidebarAuthentication from "@/components/authentication/navigation-sidebar-authentication";
import {GanttChart} from "lucide-react";
import NavigationSidebarLink from "@/components/navigation/navigation-sidebar-link";

export const dynamic = 'force-dynamic'

interface LayoutProps {
    children: React.ReactNode;
}

export default function PublicNavigationLayoutDashboard({children}: LayoutProps) {
    return <div className={"flex flex-col md:flex-row"}>
        <NavigationSidebar authNode={<NavigationSidebarAuthentication/>}>
            <NavigationSidebarLink href={"/dashboard"}><GanttChart/><span>Dashboard</span></NavigationSidebarLink>
        </NavigationSidebar>
        <div className={"w-full"}>
            {children}
        </div>
    </div>
}