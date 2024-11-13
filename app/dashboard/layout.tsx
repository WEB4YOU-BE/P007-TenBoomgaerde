import type { ReactNode } from "react";

import { Separator } from "@/components/atoms/separator";
import Sidebar from "@/components/ui/dashboard/sidebar";
import SidebarNavigation from "@/components/ui/dashboard/sidebarNavigation";
import {
    Box,
    Building2,
    Clock,
    Home,
    LayoutDashboard,
    List,
    PackageOpen,
    PieChart,
    Tag,
    UserCircle,
    Users,
} from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

import { fetchIsAdmin, fetchUser } from "./actions";

export const metadata: Metadata = {
    title: {
        default: "Dashboard",
        template: "%s | Dashboard | VZW Ten Boomgaerde Lichtervelde",
    },
};

export default async function Layout({ children }: { children: ReactNode }) {
    const user = await fetchUser();
    if (!user) return redirect("/authentication/");

    const isAdmin = await fetchIsAdmin(user.id);
    if (!isAdmin) return redirect("/");

    return (
        <div className="relative flex h-[100dvh] w-[100dvw] flex-row overflow-auto">
            <Sidebar>
                <SidebarNavigation
                    links={[
                        {
                            icon: Home,
                            label: "",
                            title: "Ten Boomgaerde",
                            url: "/",
                        },
                    ]}
                />
                <Separator className="bg-muted" />
                <SidebarNavigation
                    links={[
                        {
                            icon: LayoutDashboard,
                            label: "",
                            title: "Dashboard",
                            url: "/dashboard/",
                        },
                    ]}
                />
                <Separator className="bg-muted" />
                <SidebarNavigation
                    links={[
                        {
                            icon: List,
                            label: "",
                            title: "Reservaties",
                            url: "/dashboard/reservations/",
                        },
                        {
                            icon: PieChart,
                            label: "",
                            title: "Analyses",
                            url: "/dashboard/analysis/",
                        },
                    ]}
                />
                <Separator className="bg-muted" />
                <SidebarNavigation
                    links={[
                        {
                            icon: Box,
                            label: "",
                            title: "Zalen",
                            url: "/dashboard/halls/",
                        },
                        {
                            icon: Clock,
                            label: "",
                            title: "Tijdsblokken",
                            url: "/dashboard/timeslots/",
                        },
                    ]}
                />
                <Separator className="bg-muted" />
                <SidebarNavigation
                    links={[
                        {
                            icon: Tag,
                            label: "",
                            title: "Categorieën",
                            url: "/dashboard/categories/",
                        },
                        {
                            icon: PackageOpen,
                            label: "",
                            title: "Producten",
                            url: "/dashboard/products/",
                        },
                    ]}
                />
                <Separator className="bg-muted" />
                <SidebarNavigation
                    links={[
                        {
                            icon: Building2,
                            label: "",
                            title: "Organisaties",
                            url: "/dashboard/organisations/",
                        },
                        {
                            icon: Users,
                            label: "",
                            title: "Gebruikers",
                            url: "/dashboard/users/",
                        },
                    ]}
                />
                <Separator className="mb-auto bg-muted" />
                <SidebarNavigation
                    links={[
                        {
                            icon: UserCircle,
                            label: "",
                            title: "Account",
                            url: "/account/",
                        },
                    ]}
                />
            </Sidebar>
            <div className="h-full w-full py-2 pe-2">
                <div className="h-full w-full">{children}</div>
            </div>
        </div>
    );
}
