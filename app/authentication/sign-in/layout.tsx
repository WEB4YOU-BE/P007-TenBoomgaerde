import { buttonVariants } from "@/components/atoms/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/atoms/card";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import Link from "next/link";
import React from "react";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Card className="w-[350px] max-w-[100dvw]">
                <CardHeader>
                    <CardTitle>Log in</CardTitle>
                    <CardDescription>Ga verder met &hellip;</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    {children}
                </CardContent>
                <CardFooter>
                    <Link
                        className={cn(
                            buttonVariants({ variant: "link" }),
                            "text-balance"
                        )}
                        href={"/authentication/recover/"}
                    >
                        Ik kan me niet aanmelden
                    </Link>
                </CardFooter>
            </Card>
        </>
    );
}
