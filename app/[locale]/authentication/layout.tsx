import Image from "next/image";
import React from "react";

import { Link } from "@/i18n/navigation";
import tenBoomgaerdeLogo from "@/public/images/logo.png";
import NextLayout from "@/types/next/layout";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

interface LayoutProps extends NextLayout {
    params: Promise<{ locale: string }>;
}
const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-row-reverse">
            <div className="flex-1 min-h-dvh">{children}</div>
            <div className="flex-1 min-h-dvh bg-muted text-muted-foreground max-lg:hidden">
                <div className="h-full max-h-dvh sticky top-0 flex flex-col justify-between gap-4 p-8">
                    <Link
                        className={cn(
                            buttonVariants({ variant: "link" }),
                            "w-fit ps-0 text-lg"
                        )}
                        href={"/"}
                    >
                        <Image
                            alt={"Logo"}
                            className={
                                "mr-2 aspect-square h-8 w-8 rounded-full"
                            }
                            height={32}
                            src={tenBoomgaerdeLogo}
                            width={32}
                        />
                        VZW Ten Boomgaerde Lichtervelde
                    </Link>
                    <blockquote className="space-y-2">
                        <p className="text-balance text-lg">
                            &ldquo;Deze website maakt het ons vele malen
                            makkelijker om een reservering te ontvangen,
                            verwerken en accepteren.&rdquo;
                        </p>
                        <footer className="text-sm">Guy Beeusaert</footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
};

export default Layout;
