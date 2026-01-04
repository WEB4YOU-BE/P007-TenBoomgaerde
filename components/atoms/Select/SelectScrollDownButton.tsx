"use client";

import { CaretDownIcon } from "@phosphor-icons/react/ssr";
import { ScrollDownButton } from "@radix-ui/react-select";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SelectScrollDownButton = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof ScrollDownButton>) => (
    <ScrollDownButton
        className={cn(
            "flex cursor-default items-center justify-center py-1",
            className
        )}
        data-slot="select-scroll-down-button"
        {...props}
    >
        <CaretDownIcon className="size-4" />
    </ScrollDownButton>
);

export default SelectScrollDownButton;
