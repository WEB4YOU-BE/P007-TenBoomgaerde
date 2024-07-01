import { Separator } from "@/components/atoms/separator";
import NavigationSidebarAuthentication from "@/components/authentication/navigation-sidebar-authentication";
import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import NavigationSidebarLink from "@/components/navigation/navigation-sidebar-link";
import { createClient } from "@/utils/supabase/server";
import {
  Box,
  Building2,
  Clock3,
  Home,
  List,
  PackageOpen,
  PieChart,
  Tag,
  Users,
} from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Dashboard",
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
    <div className={"flex flex-col md:flex-row"}>
      <NavigationSidebar authNode={<NavigationSidebarAuthentication />}>
        <NavigationSidebarLink href={"/dashboard"}>
          <Home />
          <span>Dashboard</span>
        </NavigationSidebarLink>
        <Separator />
        <NavigationSidebarLink href={"/dashboard/reservations"}>
          <List />
          <span>Reservaties</span>
        </NavigationSidebarLink>
        <NavigationSidebarLink href={"/dashboard/analysis"}>
          <PieChart />
          <span>Analyses</span>
        </NavigationSidebarLink>
        <Separator />
        <NavigationSidebarLink href={"/dashboard/halls"}>
          <Box />
          <span>Zalen</span>
        </NavigationSidebarLink>
        <NavigationSidebarLink href={"/dashboard/halls/timeslots"}>
          <Clock3 />
          Blokken
        </NavigationSidebarLink>
        <Separator />
        <NavigationSidebarLink href={"/dashboard/products/categories"}>
          <Tag />
          <span>Categorieën</span>
        </NavigationSidebarLink>
        <NavigationSidebarLink href={"/dashboard/products"}>
          <PackageOpen />
          <span>Producten</span>
        </NavigationSidebarLink>
        <Separator />
        <NavigationSidebarLink href={"/dashboard/organisations"}>
          <Building2 />
          <span>Organisaties</span>
        </NavigationSidebarLink>
        <NavigationSidebarLink href={"/dashboard/users"}>
          <Users />
          <span>Gebruikers</span>
        </NavigationSidebarLink>
      </NavigationSidebar>
      <div className={"w-full"}>{children}</div>
    </div>
  );
}
