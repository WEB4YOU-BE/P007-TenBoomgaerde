import React from "react";
import Link from "next/link";
import Image from "next/image";


interface NavigationSidebarProps {
    children: React.ReactNode;
    authNode?: React.ReactNode;
}

export default async function NavigationSidebar({children, authNode}: NavigationSidebarProps) {
    return <div
        className={"flex-shrink-0 flex flex-col bg-green-200 md:sticky md:top-0 md:z-50 md:w-[320px] md:h-[100dvh]"}>
        <div className={"w-full p-2 flex"}>
            <Link href={"/dashboard"} className={"flex flex-row gap-2 p-2"}>
                <Image className={"w-[40px] h-[40px] rounded-full"} src={"/images/Logo Ten Boomgaerde.PNG"}
                       alt={"Logo"} width={40} height={40}/>
                <p className={"self-center text-xl font-semibold sm:text-2xl whitespace-nowrap pl-1"}>Ten
                    Boomgaerde</p>
            </Link>
        </div>
        <nav className={"flex-grow flex flex-col gap-2 p-2"}>
            {children}
        </nav>
        <div className={"p-2"}>
            {authNode}
        </div>
    </div>
}