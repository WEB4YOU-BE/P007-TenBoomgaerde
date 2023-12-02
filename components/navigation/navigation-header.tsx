import Image from "next/image";
import React from "react";
import ResponsiveHeader from "@/components/navigation/responsive-header";

interface NavigationHeaderProps {
    children: React.ReactNode;
    authNode?: React.ReactNode;
}

export default async function NavigationHeader({children, authNode}: NavigationHeaderProps) {
    return <div
        className={"sm:sticky sm:top-0 sm:z-50 container max-w-screen-xl mx-auto p-2 bg-gray-200 rounded-lg m-2"}>
        <div className={"bg-gray-200 rounded-lg flex flex-col lg:flex-row overflow-x-auto gap-2"}>
            <ResponsiveHeader title={
                <Image src={"/images/Logo Ten Boomgaerde.PNG"} alt={"Logo"} width={77} height={77}
                       className={"aspect-square w-[40px] h-[40px] rounded-lg"}/>
            }>
                <>
                    <nav className={"flex flex-col flex-grow md:overflow-x-auto gap-2 mb-2"}>
                        {children}
                    </nav>
                    <div className={"flex flex-col"}>{authNode}</div>
                </>
            </ResponsiveHeader>
            <nav className={"max-sm:hidden flex flex-row flex-grow md:overflow-x-auto gap-2"}>
                {children}
            </nav>
            <div className={"max-sm:hidden"}>{authNode}</div>
        </div>
    </div>
}