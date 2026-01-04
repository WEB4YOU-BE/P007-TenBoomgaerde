"use client";

import { CheckIcon } from "@phosphor-icons/react/ssr";
import { CheckboxItem, ItemIndicator } from "@radix-ui/react-menubar";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const MenubarCheckboxItem = ({
    checked,
    children,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof CheckboxItem>) => (
    <CheckboxItem
        checked={checked}
        className={cn(
            "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
        )}
        data-slot="menubar-checkbox-item"
        {...props}
    >
        <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
            <ItemIndicator>
                <CheckIcon className="size-4" />
            </ItemIndicator>
        </span>
        {children}
    </CheckboxItem>
);

export default MenubarCheckboxItem;
