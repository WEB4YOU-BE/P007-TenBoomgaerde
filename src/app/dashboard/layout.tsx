"use client"

import * as React from "react"

import DashboardNavigation from "@/components/ui/dashboard/Navigation";


export default function PublicNavigationLayoutDashboard({children}: { children: React.ReactNode }) {

    return <>
        <DashboardNavigation/>
        <div className={"sm:ml-80"}>
            {children}
        </div>
    </>;
}