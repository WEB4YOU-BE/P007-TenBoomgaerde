import { buttonVariants } from "@/components/atoms/button";
import { cn } from "@/utils/tailwindcss/MergeCN";
import Image from "next/image";
import Link from "next/link";
import { forwardRef, HTMLAttributes } from "react";

interface DesktopFooterProps extends HTMLAttributes<HTMLDivElement> {}
const DesktopFooter = forwardRef<HTMLDivElement, DesktopFooterProps>(
  ({ className, ...props }, ref) => {
    const leftItems: NavigationItem[] = [
      {
        title: "Regelement vergaderzalen",
        href: "/documents/Reglement_vergaderzalen_Ten_Boomgaerde_vzw.pdf",
      },
    ];
    const rightItems: NavigationItem[] = [
      {
        title: "Boomgaerdestraat 4a, 8810 Lichtervelde",
        href: "https://www.google.com/maps/place/Zaal+Ten+Boomgaerde/@51.0280964,3.1406539,15z/data=!4m6!3m5!1s0x47c34bdf2550654d:0xa6fb68fa7774a37e!8m2!3d51.0280964!4d3.1406539!16s%2Fg%2F1t_hy456?entry=ttu",
      },
      {
        title: "Email",
        href: "mailto:info@vzwtenboomgaerdelichtervelde.be",
        isPrimairy: true,
      },
    ];
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
              {leftItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={buttonVariants({
                    variant: item.isPrimairy ? "default" : "secondary",
                  })}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-row gap-2">
              {rightItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={buttonVariants({
                    variant: item.isPrimairy ? "default" : "secondary",
                  })}
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
DesktopFooter.displayName = "Main site footer for desktop";

export default DesktopFooter;
