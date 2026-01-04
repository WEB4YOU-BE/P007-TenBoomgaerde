"use client";

import { CheckIcon } from "@phosphor-icons/react/ssr";
import { Item, ItemIndicator, ItemText } from "@radix-ui/react-select";
import React, { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";

const SelectItem = ({
    children,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof Item>) => (
    <Item
        className={cn(
            "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
            className
        )}
        data-slot="select-item"
        {...props}
    >
        <span className="absolute right-2 flex size-3.5 items-center justify-center">
            <ItemIndicator>
                <CheckIcon className="size-4" />
            </ItemIndicator>
        </span>
        <ItemText>{children}</ItemText>
    </Item>
);

export default SelectItem;
