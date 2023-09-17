import Image from "next/image";
import React from "react";

interface NavigationHeaderProps {
    children: React.ReactNode;
    authNode?: React.ReactNode;
}

export default async function NavigationHeader({children, authNode}: NavigationHeaderProps) {
    return <div className={"sm:sticky sm:top-0 sm:z-50 container max-w-screen-md mx-auto p-2"}>
        <div className={"bg-gray-200 rounded-lg flex flex-row overflow-x-auto gap-2 p-2"}>
            <Image src={"/images/Logo Ten Boomgaerde.PNG"} alt={"Logo"} width={77} height={77} className={"aspect-square w-[40px] h-[40px] rounded-lg"}/>
            <nav className={"flex flex-row flex-grow md:overflow-x-auto gap-2"}>
                {children}
            </nav>
            {authNode}
        </div>
    </div>
}