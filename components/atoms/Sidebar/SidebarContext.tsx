"use client";

import { createContext } from "react";

interface SidebarContextProps {
    isMobile: boolean;
    open: boolean;
    openMobile: boolean;
    setOpen: (open: boolean) => void;
    setOpenMobile: (open: boolean) => void;
    state: "collapsed" | "expanded";
    toggleSidebar: () => void;
}
const SidebarContext = createContext<null | SidebarContextProps>(null);

export type { SidebarContextProps };
export default SidebarContext;
