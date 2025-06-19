import { NextPage } from "next";
import Link from "next/link";
import React from "react";

import type NextLayout from "@/types/next/layout";

import Card, {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

const Layout: NextPage<NextLayout> = ({ children }: NextLayout) => {
    return (
        <>
            <Card className="w-[350px] max-w-[100dvw]">
                <CardHeader>
                    <CardTitle>Authenticeren</CardTitle>
                    <CardDescription>
                        Gebruik of maak uw account
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    {children}
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
};

export default Layout;
