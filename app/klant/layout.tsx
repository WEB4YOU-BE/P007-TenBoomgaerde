"use client"

import * as React from "react"

import KlantNavigation from "@/components/ui/klant/Navigation";


export default function PublicNavigationLayoutDashboard({children}: { children: React.ReactNode }) {

    return <>
        <KlantNavigation/>
        <div className={"sm:ml-80 h-full sm:overflow-y-auto"}>
            {children}
        </div>
    </>;
}