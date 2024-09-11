import { buttonVariants } from "@/components/atoms/button";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import Image from "next/image";
import Link from "next/link";
import { forwardRef, HTMLAttributes } from "react";
import React from "react";

interface DesktopHeaderProps extends HTMLAttributes<HTMLDivElement> {
    authItems: NavigationItem[];
    mainItems: NavigationItem[];
}
const DesktopHeader = forwardRef<HTMLDivElement, DesktopHeaderProps>(
    ({ authItems, className, mainItems, ...props }, ref) => {
        return (
            <div className={cn("w-screen", className)} ref={ref} {...props}>
                <div className="container max-w-screen-lg p-2">
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
                            {mainItems.map((item, index) => (
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
                            {authItems.map((item, index) => (
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
DesktopHeader.displayName = "Main site header for desktop";

export default DesktopHeader;
