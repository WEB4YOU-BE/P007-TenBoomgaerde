import { cn } from "@/utils/tailwindcss/mergeClassNames";
import React, { type ComponentPropsWithoutRef } from "react";

const Card = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => {
    return (
        <div
            className={cn(
                "bg-card text-card-foreground rounded-xl border shadow-sm",
                className
            )}
            data-slot="card"
            {...props}
        />
    );
};

const CardContent = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"div">) => {
    return (
        <div
            className={cn("p-6 pt-0", className)}
            data-slot="card-content"
            {...props}
        />
    );
};

const CardDescription = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"div">) => {
    return (
        <div
            className={cn("text-muted-foreground text-sm", className)}
            data-slot="card-description"
            {...props}
        />
    );
};

const CardFooter = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"div">) => {
    return (
        <div
            className={cn("flex items-center p-6 pt-0", className)}
            data-slot="card-footer"
            {...props}
        />
    );
};

const CardHeader = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"div">) => {
    return (
        <div
            className={cn("flex flex-col gap-1.5 p-6", className)}
            data-slot="card-header"
            {...props}
        />
    );
};

const CardTitle = ({
    className,
    ...props
}: ComponentPropsWithoutRef<"div">) => {
    return (
        <div
            className={cn(
                "leading-none font-semibold tracking-tight",
                className
            )}
            data-slot="card-title"
            {...props}
        />
    );
};

export {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
};
