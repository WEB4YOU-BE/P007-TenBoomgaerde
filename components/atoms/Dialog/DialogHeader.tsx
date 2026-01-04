"use client";

import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const DialogHeader = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"div">) => (
    <div
        className={cn(
            "flex flex-col gap-2 text-center sm:text-left",
            className
        )}
        data-slot="dialog-header"
        {...props}
    />
);

export default DialogHeader;
