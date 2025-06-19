import type { ReactNode } from "react";

import {
    BarcodeIcon,
    BuildingOfficeIcon,
    CalendarCheckIcon,
    ChartPieIcon,
    ClockIcon,
    DoorIcon,
    HouseIcon,
    LayoutIcon,
    SignOutIcon,
    TagIcon,
    UserCircleIcon,
    UsersIcon,
} from "@phosphor-icons/react/ssr";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

import { Separator } from "@/components/atoms/separator";
import Sidebar from "@/components/ui/dashboard/sidebar";
import SidebarNavigation from "@/components/ui/dashboard/sidebarNavigation";

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
                            icon: HouseIcon,
                            label: "Ga naar de startpagina",
                            title: "Ten Boomgaerde",
                            url: "/",
                        },
                    ]}
                />
                <Separator className="bg-muted" />
                <SidebarNavigation
                    links={[
                        {
                            icon: LayoutIcon,
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
                            icon: CalendarCheckIcon,
                            label: "",
                            title: "Reservaties",
                            url: "/dashboard/reservations/",
                        },
                        {
                            icon: ChartPieIcon,
                            label: "binnenkort",
                            title: "Analyses",
                            url: "/dashboard/analysis/",
                        },
                    ]}
                />
                <Separator className="bg-muted" />
                <SidebarNavigation
                    links={[
                        {
                            icon: DoorIcon,
                            label: "",
                            title: "Zalen",
                            url: "/dashboard/halls/",
                        },
                        {
                            icon: ClockIcon,
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
                            icon: TagIcon,
                            label: "",
                            title: "Categorieën",
                            url: "/dashboard/categories/",
                        },
                        {
                            icon: BarcodeIcon,
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
                            icon: BuildingOfficeIcon,
                            label: "",
                            title: "Organisaties",
                            url: "/dashboard/organisations/",
                        },
                        {
                            icon: UsersIcon,
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
                            icon: UserCircleIcon,
                            label: "",
                            title: "Account",
                            url: "/account/",
                        },
                        {
                            icon: SignOutIcon,
                            label: "",
                            title: "Uitloggen",
                            url: "/authentication/sign-out/",
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
