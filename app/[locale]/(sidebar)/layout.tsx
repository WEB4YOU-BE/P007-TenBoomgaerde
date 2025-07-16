import { cookies } from "next/headers";
import React from "react";

import type NextLayout from "@/types/next/layout";

import Sidebar from "@/app/[locale]/(sidebar)/sidebar";
import { SidebarProvider } from "@/components/atoms/Sidebar";

const Layout = async ({ children }: NextLayout) => {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <Sidebar>{children}</Sidebar>
        </SidebarProvider>
    );
};

export default Layout;
