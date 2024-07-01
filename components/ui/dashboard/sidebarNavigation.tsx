import { buttonVariants } from "@/components/atoms/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/tooltip";
import { cn } from "@/utils/tailwindcss/MergeCN";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { forwardRef, type HTMLAttributes } from "react";

interface NavigationProperties extends HTMLAttributes<HTMLDivElement> {
  links: {
    title: string;
    url: string;
    label?: string;
    icon: LucideIcon;
  }[];
}

const SidebarNavigation = forwardRef<HTMLDivElement, NavigationProperties>(
  ({ links, className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(className, "flex flex-col justify-center gap-1")}
        {...props}
      >
        {links.map((link, index) => (
          <Tooltip key={index} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={link.url}
                className={buttonVariants({ variant: "ghost", size: "icon" })}
              >
                <link.icon className="w-5 aspect-square" />
                <span className="sr-only">{link.title}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
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
  },
);
SidebarNavigation.displayName = "Sidebar navigation";

export default SidebarNavigation;
