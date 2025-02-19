"use client";

import { cn } from "@/utils/tailwindcss/mergeClassNames";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import React, { ComponentPropsWithoutRef } from "react";

const Avatar = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>) => {
    return (
        <AvatarPrimitive.Root
            className={cn(
                "relative flex size-8 shrink-0 overflow-hidden rounded-full",
                className
            )}
            data-slot="avatar"
            {...props}
        />
    );
};

const AvatarFallback = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>) => {
    return (
        <AvatarPrimitive.Fallback
            className={cn(
                "bg-muted flex size-full items-center justify-center rounded-full",
                className
            )}
            data-slot="avatar-fallback"
            {...props}
        />
    );
};

const AvatarImage = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>) => {
    return (
        <AvatarPrimitive.Image
            className={cn("aspect-square size-full", className)}
            data-slot="avatar-image"
            {...props}
        />
    );
};

export { Avatar, AvatarFallback, AvatarImage };
