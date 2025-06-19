import type { Metadata, NextPage } from "next";

import React from "react";

import Card, {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";

import ChangePasswordForm from "./form";

export const metadata: Metadata = {
    alternates: {
        canonical: "/authentication/change-password/",
    },
    title: "Wijzig uw wachtwoord",
};

const Page: NextPage = () => (
    <>
        <Card className="w-[350px] max-w-[100dvw]">
            <CardHeader>
                <CardTitle>Nieuw wachtwoord</CardTitle>
                <CardDescription>Voer een nieuw wachtwoord in.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChangePasswordForm />
            </CardContent>
        </Card>
    </>
);

export default Page;
