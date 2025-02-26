import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/atoms/card";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
    alternates: {
        canonical: "/authentication/",
    },
    title: "Authenticeren",
};

export default async function Page() {
    return (
        <>
            <Card className="w-[350px] max-w-[100dvw]">
                <CardHeader>
                    <CardTitle>Welkom</CardTitle>
                    <CardDescription>
                        Gebruik of maak uw account
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Link
                        className={cn(buttonVariants(), "justify-start")}
                        href={"/authentication/sign-in/"}
                    >
                        Log in
                    </Link>
                    <Link
                        className={cn(
                            buttonVariants({ variant: "outline" }),
                            "justify-start"
                        )}
                        href={"/authentication/sign-up/"}
                    >
                        Maak account
                    </Link>
                </CardContent>
                <CardFooter>
                    <Link
                        className={cn(buttonVariants({ variant: "link" }))}
                        href={"/authentication/recover/"}
                    >
                        Ik kan me niet aanmelden
                    </Link>
                </CardFooter>
            </Card>
        </>
    );
}
