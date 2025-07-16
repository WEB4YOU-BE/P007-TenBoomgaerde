import { useContext } from "react";

import SidebarContext from "@/components/atoms/Sidebar/SidebarContext";

const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context)
        throw new Error("useSidebar must be used within a SidebarProvider.");

    return context;
};

export default useSidebar;
