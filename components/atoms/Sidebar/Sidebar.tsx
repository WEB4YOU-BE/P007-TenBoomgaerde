"use client";

import React, { type ComponentPropsWithRef, type CSSProperties } from "react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/atoms/sheet";
import { SIDEBAR_WIDTH_MOBILE } from "@/components/atoms/Sidebar/constants";
import useSidebar from "@/hooks/use-sidebar";
import { cn } from "@/utils/tailwindcss/mergeClassNames";

const Sidebar = ({
    children,
    className,
    collapsible = "offcanvas",
    side = "left",
    variant = "sidebar",
    ...props
}: ComponentPropsWithRef<"div"> & {
    collapsible?: "icon" | "none" | "offcanvas";
    side?: "left" | "right";
    variant?: "floating" | "inset" | "sidebar";
}) => {
    const { isMobile, openMobile, setOpenMobile, state } = useSidebar();

    if (collapsible === "none") {
        return (
            <div
                className={cn(
                    "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
                    className
                )}
                data-slot="sidebar"
                {...props}
            >
                {children}
            </div>
        );
    }

    if (isMobile) {
        return (
            <Sheet onOpenChange={setOpenMobile} open={openMobile} {...props}>
                <SheetContent
                    className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
                    data-mobile="true"
                    data-sidebar="sidebar"
                    data-slot="sidebar"
                    side={side}
                    style={
                        {
                            "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
                        } as CSSProperties
                    }
                >
                    <SheetHeader className="sr-only">
                        <SheetTitle>Sidebar</SheetTitle>
                        <SheetDescription>
                            Displays the mobile sidebar.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex h-full w-full flex-col">
                        {children}
                    </div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <div
            className="group peer text-sidebar-foreground hidden md:block"
            data-collapsible={state === "collapsed" ? collapsible : ""}
            data-side={side}
            data-slot="sidebar"
            data-state={state}
            data-variant={variant}
        >
            {/* This is what handles the sidebar gap on desktop */}
            <div
                className={cn(
                    "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
                    "group-data-[collapsible=offcanvas]:w-0",
                    "group-data-[side=right]:rotate-180",
                    variant === "floating" || variant === "inset"
                        ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
                        : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
                )}
                data-slot="sidebar-gap"
            />
            <div
                className={cn(
                    "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
                    side === "left"
                        ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                        : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                    // Adjust the padding for floating and inset variants.
                    variant === "floating" || variant === "inset"
                        ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
                        : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
                    className
                )}
                data-slot="sidebar-container"
                {...props}
            >
                <div
                    className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
                    data-sidebar="sidebar"
                    data-slot="sidebar-inner"
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
