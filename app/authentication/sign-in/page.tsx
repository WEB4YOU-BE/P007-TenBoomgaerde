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
        met email
      </Link>
      <Link
        href={"/authentication/sign-in/Phone/"}
        className={cn(buttonVariants({ variant: "outline" }), "justify-start")}
      >
        <Phone className="mr-4 h-4 w-4" />
        met telefoon
      </Link>
      <Link
        href={"/authentication/sign-in/OAuth/"}
        className={cn(buttonVariants({ variant: "outline" }), "justify-start")}
      >
        <SiGoogle className="mr-4 h-4 w-4" />
        met sociale media
      </Link>
      <Link
        href={"/authentication/sign-in/SAML/"}
        className={cn(buttonVariants({ variant: "outline" }), "justify-start")}
      >
        <Building className="mr-4 h-4 w-4" />
        met SAML
      </Link>
    </>
  );
}
