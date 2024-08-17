import { buttonVariants } from "@/components/atoms/button";
import { cn } from "@/utils/tailwindcss/MergeCN";
import Image from "next/image";
import Link from "next/link";
import { forwardRef, HTMLAttributes } from "react";

interface DesktopHeaderProps extends HTMLAttributes<HTMLDivElement> {
  mainItems: NavigationItem[];
  authItems: NavigationItem[];
}
const DesktopHeader = forwardRef<HTMLDivElement, DesktopHeaderProps>(
  ({ className, mainItems, authItems, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("w-screen", className)} {...props}>
        <div className="container max-w-screen-lg p-2">
          <div className="flex w-full flex-row gap-2 rounded-lg bg-secondary p-2 text-secondary-foreground">
            <Image
              src={"/images/Logo Ten Boomgaerde.PNG"}
              alt={"Logo"}
              width={77}
              height={77}
              className={"aspect-square h-[40px] w-[40px] rounded-lg"}
            />
            <nav className="me-auto flex flex-row gap-2">
              {mainItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={buttonVariants({ variant: item.isPrimairy ? "default" : "secondary" })}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-row gap-2">
              {authItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={buttonVariants({ variant: item.isPrimairy ? "default" : "secondary" })}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    );
  },
);
DesktopHeader.displayName = "Main site header for desktop";

export default DesktopHeader;
