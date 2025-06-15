import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ReactNode } from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

/**
 * This layout is not available in when logged in.
 * Change this behavour in the Supabase middleware.
 * @param children The children to be displayed
 * @returns Promise<JSX.Element>
 */
export default async function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="grid h-[100dvh] grid-cols-1 lg:grid-cols-2">
            <div className="container hidden bg-muted text-muted-foreground lg:flex lg:flex-col lg:justify-between lg:p-8">
                <Link
                    className={cn(
                        buttonVariants({ variant: "link" }),
                        "w-fit ps-0 text-lg"
                    )}
                    href={"/"}
                >
                    <Image
                        alt={"Logo"}
                        className={"mr-2 aspect-square h-8 w-8 rounded-full"}
                        height={32}
                        src={"/images/Logo Ten Boomgaerde.PNG"}
                        width={32}
                    />
                    VZW Ten Boomgaerde Lichtervelde
                </Link>
                <blockquote className="space-y-2">
                    <p className="text-balance text-lg">
                        &ldquo;Deze website maakt het ons vele malen makkelijker
                        om een reservering te ontvangen, verwerken en
                        accepteren.&rdquo;
                    </p>
                    <footer className="text-sm">Guy Beeusaert</footer>
                </blockquote>
            </div>
            <div className="container flex items-center justify-center p-8">
                {children}
            </div>
        </div>
    );
}
