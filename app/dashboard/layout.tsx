import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { toast } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | VZW Ten Boomgaerde Lichtervelde",
    template: "%s | Dashboard | VZW Ten Boomgaerde Lichtervelde",
  },

  robots: {
    index: false,
    follow: false,
    noarchive: true,
    noimageindex: true,
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

  return children;
}
