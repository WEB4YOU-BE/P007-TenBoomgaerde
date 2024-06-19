import { Metadata } from "next";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/tailwindcss/MergeCN";

import { Building, Mail, Phone } from "lucide-react";
import { SiGoogle } from "@icons-pack/react-simple-icons";

export const metadata: Metadata = {
  title: "Log in",
  alternates: {
    canonical: "/authentication/sign-in/",
  },
};

export default async function Page() {
  return (
    <>
      <Link
        href={"/authentication/sign-in/Email/"}
        className={cn(buttonVariants(), "justify-start")}
      >
        <Mail className="mr-4 h-4 w-4" />
        Email
      </Link>
      <Link
        href={"/authentication/sign-in/Phone/"}
        className={cn(buttonVariants({ variant: "outline" }), "justify-start")}
      >
        <Phone className="mr-4 h-4 w-4" />
        Telefoon
      </Link>
      <Link
        href={"/authentication/sign-in/OAuth/"}
        className={cn(buttonVariants({ variant: "outline" }), "justify-start")}
      >
        <SiGoogle className="mr-4 h-4 w-4" />
        Ander account
      </Link>
      <Link
        href={"/authentication/sign-in/SAML/"}
        className={cn(buttonVariants({ variant: "outline" }), "justify-start")}
      >
        <Building className="mr-4 h-4 w-4" />
        SAML
      </Link>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background p-2 text-muted-foreground">Of</span>
        </div>
      </div>
      <Link
        href={"/authentication/sign-up/"}
        className={cn(buttonVariants({ variant: "outline" }), "justify-start")}
      >
        Maak account
      </Link>
    </>
  );
}
