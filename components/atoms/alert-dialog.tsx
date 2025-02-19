"use client";

import { buttonVariants } from "@/components/atoms/button";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import React, { type ComponentPropsWithoutRef } from "react";

const AlertDialog = ({
    ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root>) => (
    <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
);

const AlertDialogAction = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>) => (
    <AlertDialogPrimitive.Action
        className={cn(buttonVariants(), className)}
        {...props}
    />
);

const AlertDialogCancel = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>) => (
    <AlertDialogPrimitive.Cancel
        className={cn(buttonVariants({ variant: "outline" }), className)}
        {...props}
    />
);

const AlertDialogContent = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>) => (
    <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Content
            className={cn(
                "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
                className
            )}
            data-slot="alert-dialog-content"
            {...props}
        />
    </AlertDialogPortal>
);

const AlertDialogDescription = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>) => (
    <AlertDialogPrimitive.Description
        className={cn("text-muted-foreground text-sm", className)}
        data-slot="alert-dialog-description"
        {...props}
    />
);

const AlertDialogFooter = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"div">) => (
    <div
        className={cn(
            "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
            className
        )}
        data-slot="alert-dialog-footer"
        {...props}
    />
);

const AlertDialogHeader = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"div">) => (
    <div
        className={cn(
            "flex flex-col gap-2 text-center sm:text-left",
            className
        )}
        data-slot="alert-dialog-header"
        {...props}
    />
);

const AlertDialogOverlay = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>) => (
    <AlertDialogPrimitive.Overlay
        className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
            className
        )}
        data-slot="alert-dialog-overlay"
        {...props}
    />
);

const AlertDialogPortal = ({
    ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Portal>) => (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
);

const AlertDialogTitle = ({
    className,
    ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>) => (
    <AlertDialogPrimitive.Title
        className={cn("text-lg font-semibold", className)}
        data-slot="alert-dialog-title"
        {...props}
    />
);

const AlertDialogTrigger = ({
    ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger>) => (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
);

export {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogTitle,
    AlertDialogTrigger,
};
