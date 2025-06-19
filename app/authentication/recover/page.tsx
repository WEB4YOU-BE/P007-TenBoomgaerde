import type { Metadata, NextPage } from "next";

import React from "react";

import Card, {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/atoms/Card";

import ResetWithEmailCredentialsForm from "./form";

export const metadata: Metadata = {
    alternates: {
        canonical: "/authentication/recover/",
    },
    title: "Herstel uw account",
};

const Page: NextPage = () => (
    <>
        <Card className="w-[350px] max-w-[100dvw]">
            <CardHeader>
                <CardTitle>Herstel uw account</CardTitle>
                <CardDescription>Gebruik hiervoor uw email.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResetWithEmailCredentialsForm />
            </CardContent>
        </Card>
    </>
);

export default Page;
