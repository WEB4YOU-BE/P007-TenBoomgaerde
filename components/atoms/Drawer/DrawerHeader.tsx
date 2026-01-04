"use client";

import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const DrawerHeader = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"div">) => (
    <div
        className={cn("flex flex-col gap-1.5 p-4", className)}
        data-slot="drawer-header"
        {...props}
    />
);

export default DrawerHeader;
