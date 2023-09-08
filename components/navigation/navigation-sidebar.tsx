import React from "react";


interface NavigationSidebarProps {
    children: React.ReactNode;
    authNode?: React.ReactNode;
}

export default async function NavigationSidebar({children, authNode}: NavigationSidebarProps) {
    return <div className={"flex-shrink-0 flex flex-col bg-gray-200 sm:sticky sm:top-0 sm:z-50 sm:w-[320px] sm:h-[100svh]"}>
        <nav className={"flex-grow flex flex-col gap-2 p-2"}>
            {children}
        </nav>
        <div className={"p-2"}>
            {authNode}
        </div>
    </div>
}