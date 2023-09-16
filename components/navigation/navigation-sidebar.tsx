import React from "react";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";


interface NavigationSidebarProps {
    children: React.ReactNode;
    authNode?: React.ReactNode;
}

export default async function NavigationSidebar({children, authNode}: NavigationSidebarProps) {
    return <div className={"flex-shrink-0 flex flex-col bg-gray-200 md:sticky md:top-0 md:z-50 md:w-[320px] md:h-[100dvh]"}>
        <div className={"w-full p-2 flex"}>
            <Link href={"/"}
                  className={cn(buttonVariants({variant: "ghost"}), "scroll-m-20 rounded-b-none border-b border-black text-3xl font-semibold tracking-tight transition-colors first:mt-0 p-2 flex-grow justify-start flex-shrink-0")}>Ten
                Boomgaerde</Link>
        </div>
        <nav className={"flex-grow flex flex-col gap-2 p-2"}>
            {children}
        </nav>
        <div className={"p-2"}>
            {authNode}
        </div>
    </div>
}