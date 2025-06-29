import { NextPage } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";

import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";
import Card from "@/components/atoms/Card/Card";
import { Link } from "@/i18n/navigation";
import { cn } from "@/utils/tailwindcss/mergeClassNames";
import buttonVariants from "@/utils/tailwindcss/variants/buttonVariants";

interface PageProps {
    params: Promise<object>;
}
const Page: NextPage<PageProps> = async () => {
    const t = await getTranslations();
    console.log(t("test"));
    return (
        <main className="w-full h-full flex flex-col justify-center items-center p-8">
            <Card className="max-w-xs w-full">
                <CardHeader>
                    <CardTitle>Authenticeren</CardTitle>
                    <CardDescription className="text-wrap">
                        Meld u aan bij uw account of maak een nieuw account aan
                        om toegang te krijgen tot de functies van de website.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Link
                        className={cn(buttonVariants(), "justify-start")}
                        href={"/authentication/sign-in/"}
                    >
                        Aanmelden
                    </Link>
                    <Link
                        className={cn(
                            buttonVariants({ variant: "outline" }),
                            "justify-start"
                        )}
                        href={"/authentication/sign-up/"}
                    >
                        Maak een account aan
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
        </main>
    );
};

export default Page;
