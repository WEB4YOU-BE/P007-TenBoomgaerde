import { SiGoogle } from "@icons-pack/react-simple-icons";
import { Building, Envelope, Phone } from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

export const metadata: Metadata = {
    alternates: {
        canonical: "/authentication/sign-in/",
    },
    title: "Log in",
};

export default async function Page() {
    return (
        <>
            {!!process.env.ALLOW_EMAIL && (
                <Link
                    className={cn(buttonVariants(), "justify-start")}
                    href={"/authentication/sign-in/Email/"}
                >
                    <Envelope className="mr-4 size-4" />
                    Email
                </Link>
            )}
            {!!process.env.ALLOW_PHONE && (
                <Link
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        "justify-start"
                    )}
                    href={"/authentication/sign-in/Phone/"}
                >
                    <Phone className="mr-4 size-4" />
                    Telefoon
                </Link>
            )}
            {!!process.env.ALLOW_OAUTH && (
                <Link
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        "justify-start"
                    )}
                    href={"/authentication/sign-in/OAuth/"}
                >
                    <SiGoogle className="mr-4 size-4" />
                    Ander account
                </Link>
            )}
            {!!process.env.ALLOW_SAML && (
                <Link
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        "justify-start"
                    )}
                    href={"/authentication/sign-in/SAML/"}
                >
                    <Building className="mr-4 size-4" />
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
                href={"/authentication/sign-up/"}
            >
                Maak account
            </Link>
        </>
    );
}
