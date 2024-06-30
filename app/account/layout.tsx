import { Separator } from "@/components/atoms/separator";
import { AccountNavigation } from "@/components/ui/account-navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const navigationItems = [
    {
      title: "Account",
      href: "/account/",
    },
  ];

  return (
    <div className="container mx-auto space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Account</h2>
        <p className="text-muted-foreground">
          Beheer jouw account instellingen en reservaties.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <AccountNavigation items={navigationItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
