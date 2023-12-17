import React from "react";
import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import NavigationSidebarAuthentication from "@/components/authentication/navigation-sidebar-authentication";
import NavigationSidebarLink from "@/components/navigation/navigation-sidebar-link";
import {Box, Building2, Calendar, Clock3, Home, List, PackageOpen, PieChart, Tag, Users} from "lucide-react";
import AdminRouteProtection from "@/components/authentication/admin-route-protection";

export const dynamic = 'force-dynamic'

interface LayoutProps {
    children: React.ReactNode;
}

export default async function layout({children}: LayoutProps) {
    return <AdminRouteProtection>
        <div className={"flex flex-col md:flex-row"}>
            <NavigationSidebar authNode={<NavigationSidebarAuthentication/>}>
                <NavigationSidebarLink href={"/dashboard"}><Home/><span>Dashboard</span></NavigationSidebarLink>
                <NavigationSidebarLink href={"/dashboard/agenda"}><Calendar/><span>Agenda</span></NavigationSidebarLink>
                <NavigationSidebarLink
                    href={"/dashboard/reservaties"}><List/><span>Reservaties</span></NavigationSidebarLink>
                <NavigationSidebarLink href={"/dashboard/zalen"}><Box/><span>Zalen</span></NavigationSidebarLink>
                <NavigationSidebarLink href={"/dashboard/zalen/blokken"}><Clock3/>Blokken</NavigationSidebarLink>
                <NavigationSidebarLink href={"/dashboard/producten"}><PackageOpen/><span>Producten</span></NavigationSidebarLink>
                <NavigationSidebarLink href={"/dashboard/producten/categorieen"}><Tag/><span>Categorieën</span></NavigationSidebarLink>
                <NavigationSidebarLink href={"/dashboard/analyses"}><PieChart/><span>Analyses</span></NavigationSidebarLink>
                <NavigationSidebarLink
                    href={"/dashboard/gebruikers"}><Users/><span>Gebruikers</span></NavigationSidebarLink>
                <NavigationSidebarLink
                    href={"/dashboard/organisaties"}><Building2/><span>Organisaties</span></NavigationSidebarLink>
            </NavigationSidebar>
            <div className={"w-full"}>
                {children}
            </div>
        </div>
    </AdminRouteProtection>
}