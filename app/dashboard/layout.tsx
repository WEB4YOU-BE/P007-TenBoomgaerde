import { Separator } from "@/components/atoms/separator";
import Sidebar from "@/components/ui/dashboard/sidebar";
import SidebarNavigation from "@/components/ui/dashboard/sidebarNavigation";
import { createClient } from "@/utils/supabase/server";
import {
  Box,
  Building2,
  Clock,
  Home,
  LayoutDashboard,
  List,
  PackageOpen,
  PieChart,
  Tag,
  UserCircle,
  Users,
} from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Dashboard | VZW Ten Boomgaerde Lichtervelde",
  },
};

export default async function Layout({ children }: { children: ReactNode }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirect("/authentication/");

  const { data: is_admin } = await supabase.rpc("is_admin", {
    user_id: user.id,
  });
  if (!is_admin) return redirect("/");

  return (
    <div className="relative flex h-[100dvh] w-[100dvw] flex-row overflow-auto">
      <Sidebar>
        <SidebarNavigation
          links={[
            {
              title: "Ten Boomgaerde",
              label: "",
              icon: Home,
              url: "/",
            },
          ]}
        />
        <Separator className="bg-muted" />
        <SidebarNavigation
          links={[
            {
              title: "Dashboard",
              label: "",
              icon: LayoutDashboard,
              url: "/dashboard/",
            },
          ]}
        />
        <Separator className="bg-muted" />
        <SidebarNavigation
          links={[
            {
              title: "Reservaties",
              label: "",
              icon: List,
              url: "/dashboard/reservations/",
            },
            {
              title: "Analyses",
              label: "",
              icon: PieChart,
              url: "/dashboard/analysis/",
            },
          ]}
        />
        <Separator className="bg-muted" />
        <SidebarNavigation
          links={[
            {
              title: "Zalen",
              label: "",
              icon: Box,
              url: "/dashboard/halls/",
            },
            {
              title: "Tijdsblokken",
              label: "",
              icon: Clock,
              url: "/dashboard/halls/timeslots/",
            },
          ]}
        />
        <Separator className="bg-muted" />
        <SidebarNavigation
          links={[
            {
              title: "Categorieën",
              label: "",
              icon: Tag,
              url: "/dashboard/products/categories/",
            },
            {
              title: "Producten",
              label: "",
              icon: PackageOpen,
              url: "/dashboard/products/",
            },
          ]}
        />
        <Separator className="bg-muted" />
        <SidebarNavigation
          links={[
            {
              title: "Organisaties",
              label: "",
              icon: Building2,
              url: "/dashboard/organisations/",
            },
            {
              title: "Gebruikers",
              label: "",
              icon: Users,
              url: "/dashboard/users/",
            },
          ]}
        />
        <Separator className="mb-auto bg-muted" />
        <SidebarNavigation
          links={[
            {
              title: "Account",
              label: "",
              icon: UserCircle,
              url: "/account/",
            },
          ]}
        />
      </Sidebar>
      <div className="h-full w-full py-2 pe-2">
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
}
