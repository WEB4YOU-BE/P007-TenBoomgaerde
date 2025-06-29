import { NextPage } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";

import ChangePasswordForm from "@/app/[locale]/authentication/change-password/form";
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
                    <CardTitle>Wachtwoord wijzigen</CardTitle>
                    <CardDescription className="text-wrap">
                        Vul uw nieuwe wachtwoord in om uw account te beveiligen.
                        Zorg ervoor dat uw wachtwoord sterk en uniek is.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <ChangePasswordForm />
                </CardContent>
            </Card>
        </main>
    );
};

export default Page;
