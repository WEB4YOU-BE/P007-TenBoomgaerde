import {UrlObject} from "url";
import {HTMLAttributeAnchorTarget} from "react";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";


type Url = string | UrlObject;

interface NavigationHeaderLinkProps {
    href: Url;
    target?: HTMLAttributeAnchorTarget;
    children?: React.ReactNode;
}

export default async function NavigationHeaderLink({href, target, children}: NavigationHeaderLinkProps) {
    return <Link href={href} target={target}
                 className={cn(buttonVariants({variant: "green"}), "flex-shrink-0")}>
        {children}
    </Link>
}