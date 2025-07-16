"use client";

import { SidebarSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import React, {
    type ComponentPropsWithRef,
    MouseEventHandler,
    useCallback,
} from "react";

import Button from "@/components/atoms/Button";
import useSidebar from "@/hooks/use-sidebar";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SidebarTrigger = ({
    className,
    onClick,
    ...props
}: ComponentPropsWithRef<typeof Button>) => {
    const { toggleSidebar } = useSidebar();
    const handleToggleSidebar: MouseEventHandler<HTMLButtonElement> =
        useCallback(
            (event) => {
                onClick?.(event);
                toggleSidebar();
            },
            [onClick, toggleSidebar]
        );

    return (
        <Button
            className={cn("size-7", className)}
            data-sidebar="trigger"
            data-slot="sidebar-trigger"
            onClick={handleToggleSidebar}
            size="icon"
            variant="ghost"
            {...props}
        >
            <SidebarSimpleIcon />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    );
};

export default SidebarTrigger;
