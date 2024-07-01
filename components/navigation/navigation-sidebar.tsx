import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/tailwindcss/MergeCN";
import { buttonVariants } from "@/components/atoms/button";
import ResponsiveSidebar from "@/components/navigation/responsive-sidebar";

interface NavigationSidebarProps {
  children: React.ReactNode;
  authNode?: React.ReactNode;
}

export default function NavigationSidebar({
  children,
  authNode,
}: NavigationSidebarProps) {
  return (
    <div
      className={
        "flex flex-shrink-0 flex-col gap-4 bg-accent text-accent-foreground p-2 md:sticky md:top-0 md:z-50 md:h-[100dvh] md:w-[320px]"
      }
    >
      <ResponsiveSidebar
        title={
          <Link
            href={"/"}
            className={cn(
              buttonVariants({ variant: "link" }),
              "flex flex-row justify-start gap-2",
            )}
          >
            <Image
              src={"/images/Logo Ten Boomgaerde.PNG"}
              alt={"Logo"}
              width={40}
              height={40}
              className={"h-[40px] w-[40px] rounded-full"}
            />
            <p
              className={
                "self-center whitespace-nowrap pl-1 text-xl font-semibold sm:text-2xl"
              }
            >
              Ten Boomgaerde
            </p>
          </Link>
        }
      >
        <>
          <nav className={"flex flex-grow flex-col gap-2 overflow-y-auto"}>
            {children}
          </nav>
          <div className={"p-2"}>{authNode}</div>
        </>
      </ResponsiveSidebar>
      <nav
        className={
          "flex flex-grow flex-col gap-2 overflow-y-auto max-lg:hidden"
        }
      >
        {children}
      </nav>
      <div className={"p-2 max-lg:hidden"}>{authNode}</div>
    </div>
  );
}
