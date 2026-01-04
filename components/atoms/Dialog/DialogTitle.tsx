"use client";

import { Title } from "@radix-ui/react-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const DialogTitle = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Title>) => (
    <Title
        className={cn(
            "text-lg leading-none font-semibold tracking-tight",
            className
        )}
        data-slot="dialog-title"
        {...props}
    />
);

export default DialogTitle;
