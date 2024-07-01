import {UrlObject} from "url";
import {HTMLAttributeAnchorTarget} from "react";
import { cn } from "@/utils/tailwindcss/MergeCN";
import {buttonVariants} from "@/components/atoms/button";
import Link from "next/link";

type Url = string | UrlObject;

interface NavigationSidebarLinkProps {
    href: Url;
    target?: HTMLAttributeAnchorTarget;
    children?: React.ReactNode;
}

export default async function NavigationSidebarLink({href, target, children}: NavigationSidebarLinkProps) {
    return <Link href={href} target={target}
                 className={cn(buttonVariants({variant: "ghost"}), "justify-start flex-shrink-0 gap-2 text-base")}>
        {children}
    </Link>
}