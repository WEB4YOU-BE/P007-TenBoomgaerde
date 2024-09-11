import { buttonVariants } from "@/components/atoms/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/atoms/tooltip";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { forwardRef, type HTMLAttributes } from "react";

interface NavigationProperties extends HTMLAttributes<HTMLDivElement> {
    links: {
        icon: LucideIcon;
        label?: string;
        title: string;
        url: string;
    }[];
}

const SidebarNavigation = forwardRef<HTMLDivElement, NavigationProperties>(
    ({ className, links, ...props }, ref) => {
        return (
            <nav
                className={cn(className, "flex flex-col justify-center gap-1")}
                ref={ref}
                {...props}
            >
                {links.map((link, index) => (
                    <Tooltip delayDuration={0} key={index}>
                        <TooltipTrigger asChild>
                            <Link
                                className={buttonVariants({
                                    size: "icon",
                                    variant: "ghost",
                                })}
                                href={link.url}
                            >
                                <link.icon className="w-5 aspect-square" />
                                <span className="sr-only">{link.title}</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent
                            className="flex items-center gap-4"
                            side="right"
                        >
                            {link.title}
                            {link.label && (
                                <span className="ml-auto text-muted-foreground">
                                    {link.label}
                                </span>
                            )}
                        </TooltipContent>
                    </Tooltip>
                ))}
            </nav>
        );
    }
);
SidebarNavigation.displayName = "Sidebar navigation";

export default SidebarNavigation;
