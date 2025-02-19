"use client";

import { cn } from "@/utils/tailwindcss/mergeClassNames";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import React, { type ComponentPropsWithoutRef } from "react";

const ContextMenu = ({
    ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root>) => (
    <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
);

const ContextMenuCheckboxItem = ({
    checked,
    children,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>) => (
    <ContextMenuPrimitive.CheckboxItem
        checked={checked}
        className={cn(
            "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
        )}
        data-slot="context-menu-checkbox-item"
        {...props}
    >
        <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
            <ContextMenuPrimitive.ItemIndicator>
                <CheckIcon className="size-4" />
            </ContextMenuPrimitive.ItemIndicator>
        </span>
        {children}
    </ContextMenuPrimitive.CheckboxItem>
);

const ContextMenuContent = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>) => (
    <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Content
            className={cn(
                "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
                className
            )}
            data-slot="context-menu-content"
            {...props}
        />
    </ContextMenuPrimitive.Portal>
);

const ContextMenuGroup = ({
    ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Group>) => (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
);

const ContextMenuItem = ({
    className,
    inset,
    variant = "default",
    ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
}) => (
    <ContextMenuPrimitive.Item
        className={cn(
            "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
        )}
        data-inset={inset}
        data-slot="context-menu-item"
        data-variant={variant}
        {...props}
    />
);

const ContextMenuLabel = ({
    className,
    inset,
    ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
}) => (
    <ContextMenuPrimitive.Label
        className={cn(
            "text-foreground px-2 py-1.5 text-sm font-semibold data-[inset]:pl-8",
            className
        )}
        data-inset={inset}
        data-slot="context-menu-label"
        {...props}
    />
);

const ContextMenuPortal = ({
    ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Portal>) => (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
);

const ContextMenuRadioGroup = ({
    ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioGroup>) => (
    <ContextMenuPrimitive.RadioGroup
        data-slot="context-menu-radio-group"
        {...props}
    />
);

const ContextMenuRadioItem = ({
    children,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>) => (
    <ContextMenuPrimitive.RadioItem
        className={cn(
            "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
        )}
        data-slot="context-menu-radio-item"
        {...props}
    >
        <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
            <ContextMenuPrimitive.ItemIndicator>
                <CircleIcon className="size-2 fill-current" />
            </ContextMenuPrimitive.ItemIndicator>
        </span>
        {children}
    </ContextMenuPrimitive.RadioItem>
);

const ContextMenuSeparator = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>) => (
    <ContextMenuPrimitive.Separator
        className={cn("bg-border -mx-1 my-1 h-px", className)}
        data-slot="context-menu-separator"
        {...props}
    />
);

const ContextMenuShortcut = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"span">) => (
    <span
        className={cn(
            "text-muted-foreground ml-auto text-xs tracking-widest",
            className
        )}
        data-slot="context-menu-shortcut"
        {...props}
    />
);

const ContextMenuSub = ({
    ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Sub>) => (
    <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
);

const ContextMenuSubContent = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>) => (
    <ContextMenuPrimitive.SubContent
        className={cn(
            "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg",
            className
        )}
        data-slot="context-menu-sub-content"
        {...props}
    />
);

const ContextMenuSubTrigger = ({
    children,
    className,
    inset,
    ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
}) => (
    <ContextMenuPrimitive.SubTrigger
        className={cn(
            "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
        )}
        data-inset={inset}
        data-slot="context-menu-sub-trigger"
        {...props}
    >
        {children}
        <ChevronRightIcon className="ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
);

const ContextMenuTrigger = ({
    ...props
}: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger>) => (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
);

export {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuPortal,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
};
