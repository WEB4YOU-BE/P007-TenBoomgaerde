import { buttonVariants } from "@/components/atoms/button";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import Image from "next/image";
import Link from "next/link";
import { forwardRef, HTMLAttributes } from "react";
import React from "react";

type DesktopFooterProps = HTMLAttributes<HTMLDivElement>;
const DesktopFooter = forwardRef<HTMLDivElement, DesktopFooterProps>(
    ({ className, ...props }, ref) => {
        const leftItems: NavigationItem[] = [
            {
                href: "/documents/Reglement_vergaderzalen_Ten_Boomgaerde_vzw.pdf",
                title: "Regelement vergaderzalen",
            },
        ];
        const rightItems: NavigationItem[] = [
            {
                href: "https://www.google.com/maps/place/Zaal+Ten+Boomgaerde/@51.0280964,3.1406539,15z/data=!4m6!3m5!1s0x47c34bdf2550654d:0xa6fb68fa7774a37e!8m2!3d51.0280964!4d3.1406539!16s%2Fg%2F1t_hy456?entry=ttu",
                title: "Boomgaerdestraat 4a, 8810 Lichtervelde",
            },
            {
                href: "mailto:info@vzwtenboomgaerdelichtervelde.be",
                isPrimairy: true,
                title: "Email",
            },
        ];
        return (
            <div className={cn("w-screen", className)} ref={ref} {...props}>
                <div className="container max-w-(--breakpoint-lg) p-2">
                    <div className="flex w-full flex-row gap-2 rounded-lg bg-secondary p-2 text-secondary-foreground">
                        <Image
                            alt={"Logo"}
                            className={
                                "aspect-square h-[40px] w-[40px] rounded-lg"
                            }
                            height={77}
                            src={"/images/Logo Ten Boomgaerde.PNG"}
                            width={77}
                        />
                        <nav className="me-auto flex flex-row gap-2">
                            {leftItems.map((item, index) => (
                                <Link
                                    className={buttonVariants({
                                        variant: item.isPrimairy
                                            ? "default"
                                            : "secondary",
                                    })}
                                    href={item.href}
                                    key={index}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                        <nav className="flex flex-row gap-2">
                            {rightItems.map((item, index) => (
                                <Link
                                    className={buttonVariants({
                                        variant: item.isPrimairy
                                            ? "default"
                                            : "secondary",
                                    })}
                                    href={item.href}
                                    key={index}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
);
DesktopFooter.displayName = "Main site footer for desktop";

export default DesktopFooter;
