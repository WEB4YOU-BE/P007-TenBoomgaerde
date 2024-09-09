import { buttonVariants } from "@/components/atoms/button";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { Building, Mail, Phone } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
    alternates: {
        canonical: "/authentication/sign-up/",
    },
    title: "Meld aan",
};

export default async function Page() {
    return (
        <>
            {!!process.env.ALLOW_EMAIL && (
                <Link
                    className={cn(buttonVariants(), "justify-start")}
                    href={"/authentication/sign-up/Email/"}
                >
                    <Mail className="mr-4 h-4 w-4" />
                    Email
                </Link>
            )}
            {!!process.env.ALLOW_PHONE && (
                <Link
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        "justify-start"
                    )}
                    href={"/authentication/sign-up/Phone/"}
                >
                    <Phone className="mr-4 h-4 w-4" />
                    Telefoon
                </Link>
            )}
            {!!process.env.ALLOW_OAUTH && (
                <Link
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        "justify-start"
                    )}
                    href={"/authentication/sign-up/OAuth/"}
                >
                    <SiGoogle className="mr-4 h-4 w-4" />
                    Ander account
                </Link>
            )}
            {!!process.env.ALLOW_SAML && (
                <Link
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        "justify-start"
                    )}
                    href={"/authentication/sign-up/SAML/"}
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
                    <span className="bg-background p-2 text-muted-foreground">
                        Of
                    </span>
                </div>
            </div>
            <Link
                className={cn(
                    buttonVariants({ variant: "outline" }),
                    "justify-start"
                )}
                href={"/authentication/sign-in/"}
            >
                Log in
            </Link>
        </>
    );
}
