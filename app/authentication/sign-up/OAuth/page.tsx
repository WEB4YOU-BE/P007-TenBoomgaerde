import type { Metadata, NextPage } from "next";

import React from "react";

import Alert, { AlertDescription, AlertTitle } from "@/components/atoms/Alert";

export const metadata: Metadata = {
    alternates: {
        canonical: "/authentication/sign-up/OAuth/",
    },
    title: "Meld aan met derde partij",
};

const Page: NextPage = () => (
    <>
        <Alert>
            <AlertTitle>Komt binnenkort!</AlertTitle>
            <AlertDescription>
                Deze functie is nog niet beschikbaar.
            </AlertDescription>
        </Alert>
    </>
);

export default Page;
