import React from "react";
import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import ResponsiveSidebar from "@/components/navigation/responsive-sidebar";


interface NavigationSidebarProps {
    children: React.ReactNode;
    authNode?: React.ReactNode;
}

export default function NavigationSidebar({children, authNode}: NavigationSidebarProps) {

    return <div className={"flex-shrink-0 flex flex-col gap-4 bg-green-200 md:sticky md:top-0 md:z-50 md:w-[320px] md:h-[100dvh] p-2"}>
        <ResponsiveSidebar title={
            <Link href={"/"} className={cn(buttonVariants({variant: "green"}), "flex flex-row justify-start gap-2")}>
            <Image src={"/images/Logo Ten Boomgaerde.PNG"} alt={"Logo"} width={40} height={40}
                   className={"w-[40px] h-[40px] rounded-full"}/>
            <p className={"self-center text-xl font-semibold sm:text-2xl whitespace-nowrap pl-1"}>Ten Boomgaerde</p>
        </Link>
        }>
            <>
                <nav className={"flex-grow flex flex-col gap-2 overflow-y-auto"}>{children}</nav>
                <div className={"p-2"}>{authNode}</div>
            </>
        </ResponsiveSidebar>
        <nav className={"max-sm:hidden flex-grow flex flex-col gap-2 overflow-y-auto"}>{children}</nav>
        <div className={"max-sm:hidden p-2"}>{authNode}</div>
    </div>
}