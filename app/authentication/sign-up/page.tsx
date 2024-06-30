import { Metadata } from "next";

import Link from "next/link";

import { buttonVariants } from "@/components/atoms/button";
import { cn } from "@/utils/tailwindcss/MergeCN";

import { Building, Mail, Phone } from "lucide-react";
import { SiGoogle } from "@icons-pack/react-simple-icons";

export const metadata: Metadata = {
  title: "Meld aan",
  alternates: {
    canonical: "/authentication/sign-up/",
  },
};

export default async function Page() {
  return (
    <>
      {!!process.env.ALLOW_EMAIL && (
        <Link
          href={"/authentication/sign-up/Email/"}
          className={cn(buttonVariants(), "justify-start")}
        >
          <Mail className="mr-4 h-4 w-4" />
          Email
        </Link>
      )}
      {!!process.env.ALLOW_PHONE && (
        <Link
          href={"/authentication/sign-up/Phone/"}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "justify-start",
          )}
        >
          <Phone className="mr-4 h-4 w-4" />
          Telefoon
        </Link>
      )}
      {!!process.env.ALLOW_OAUTH && (
        <Link
          href={"/authentication/sign-up/OAuth/"}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "justify-start",
          )}
        >
          <SiGoogle className="mr-4 h-4 w-4" />
          Ander account
        </Link>
      )}
      {!!process.env.ALLOW_SAML && (
        <Link
          href={"/authentication/sign-up/SAML/"}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "justify-start",
          )}
        >
          <Building className="mr-4 h-4 w-4" />
          SAML
        </Link>
      )}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background p-2 text-muted-foreground">Of</span>
        </div>
      </div>
      <Link
        href={"/authentication/sign-in/"}
        className={cn(buttonVariants({ variant: "outline" }), "justify-start")}
      >
        Log in
      </Link>
    </>
  );
}
