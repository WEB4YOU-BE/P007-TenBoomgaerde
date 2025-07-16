import { NextPage } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";

import SignOutForm from "@/app/[locale]/authentication/sign-out/form";
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";
import Card from "@/components/atoms/Card/Card";

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
                    <CardTitle>Meld af</CardTitle>
                    <CardDescription className="text-wrap">
                        Bedankt voor het gebruik van onze service! Klik op de
                        knop hieronder om af te melden.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <SignOutForm />
                </CardContent>
            </Card>
        </main>
    );
};

export default Page;
