"use client";

import { CaretUpIcon } from "@phosphor-icons/react/ssr";
import { ScrollUpButton } from "@radix-ui/react-select";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SelectScrollUpButton = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof ScrollUpButton>) => (
    <ScrollUpButton
        className={cn(
            "flex cursor-default items-center justify-center py-1",
            className
        )}
        data-slot="select-scroll-up-button"
        {...props}
    >
        <CaretUpIcon className="size-4" />
    </ScrollUpButton>
);

export default SelectScrollUpButton;
