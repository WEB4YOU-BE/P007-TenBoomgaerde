import React from "react";


interface NavigationSidebarProps {
    children: React.ReactNode;
    authNode?: React.ReactNode;
}

export default async function NavigationSidebar({children, authNode}: NavigationSidebarProps) {
    return <div className={"flex-shrink-0 flex flex-col bg-gray-200 md:sticky md:top-0 md:z-50 md:w-[320px] md:h-[100dvh]"}>
        <nav className={"flex-grow flex flex-col gap-2 p-2"}>
            {children}
        </nav>
        <div className={"p-2"}>
            {authNode}
        </div>
    </div>
}