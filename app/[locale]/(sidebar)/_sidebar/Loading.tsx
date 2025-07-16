import React, { ComponentPropsWithRef } from "react";

import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuSkeleton,
} from "@/components/atoms/Sidebar";

interface LoadingSidebarMenuProps
    extends ComponentPropsWithRef<typeof SidebarMenu> {
    items?: number;
}
const LoadingSidebarMenu = ({
    items = 1,
    ...props
}: LoadingSidebarMenuProps) => (
    <SidebarMenu {...props}>
        {Array.from({ length: items }).map((_, index) => (
            <SidebarMenuItem key={index}>
                <SidebarMenuSkeleton />
            </SidebarMenuItem>
        ))}
    </SidebarMenu>
);

export default LoadingSidebarMenu;
