"use client";

import { useState, type ReactNode } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/atoms/resizable";
import { cn } from "@/utils/tailwindcss/MergeCN";
import { Separator } from "@/components/atoms/separator";
import Navigation from "./navigation";
import {
  Box,
  Building2,
  Clock,
  LayoutDashboard,
  List,
  PackageOpen,
  PieChart,
  Tag,
  UserCircle,
  Users,
} from "lucide-react";
import { TooltipProvider } from "@/components/atoms/tooltip";
import Link from "next/link";
import { buttonVariants } from "../atoms/button";
import Image from "next/image";

interface DashboardSidebarProps {
  children: ReactNode;
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
}

export default function DashboardSidebar({
  children,
  defaultLayout = [100, 400],
  defaultCollapsed = false,
}: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <TooltipProvider>
      <ResizablePanelGroup direction="horizontal" className="min-h-[100dvh]">
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onExpand={() => {
            setIsCollapsed(false);
          }}
          onCollapse={() => {
            setIsCollapsed(true);
          }}
          className={cn(
            isCollapsed &&
              "min-w-[52px] transition-all duration-300 ease-in-out",
          )}
        >
          <div className="w-full pe-4">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "m-2 h-12 w-full flex-row gap-2 p-2",
                isCollapsed && "h-8 p-0",
              )}
            >
              <Image
                priority
                src={"/images/Logo Ten Boomgaerde.PNG"}
                alt={"Logo"}
                width={32}
                height={32}
                className="w-8 rounded object-cover"
              />
              <span className={cn("flex-grow", isCollapsed && "hidden")}>
                Ten Boomgaerde
              </span>
            </Link>
          </div>
          <Separator />
          <Navigation
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Dashboard",
                label: "",
                icon: LayoutDashboard,
                variant: "ghost",
                url: "/dashboard/",
              },
            ]}
          />
          <Separator />
          <Navigation
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Reservaties",
                label: "",
                icon: List,
                variant: "ghost",
                url: "/dashboard/reservations/",
              },
              {
                title: "Analyses",
                label: "",
                icon: PieChart,
                variant: "ghost",
                url: "/dashboard/analysis/",
              },
            ]}
          />
          <Separator />
          <Navigation
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Zalen",
                label: "",
                icon: Box,
                variant: "ghost",
                url: "/dashboard/halls/",
              },
              {
                title: "Tijdsblokken",
                label: "",
                icon: Clock,
                variant: "ghost",
                url: "/dashboard/halls/timeslots/",
              },
            ]}
          />
          <Separator />
          <Navigation
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Categorieën",
                label: "",
                icon: Tag,
                variant: "ghost",
                url: "/dashboard/products/categories/",
              },
              {
                title: "Producten",
                label: "",
                icon: PackageOpen,
                variant: "ghost",
                url: "/dashboard/products/",
              },
            ]}
          />
          <Separator />
          <Navigation
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Organisaties",
                label: "",
                icon: Building2,
                variant: "ghost",
                url: "/dashboard/organisations/",
              },
              {
                title: "Gebruikers",
                label: "",
                icon: Users,
                variant: "ghost",
                url: "/dashboard/users/",
              },
            ]}
          />
          <Separator />
          <Navigation
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Account",
                label: "",
                icon: UserCircle,
                variant: "ghost",
                url: "/account/",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
