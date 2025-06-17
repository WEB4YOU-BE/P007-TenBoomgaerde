import type { Metadata, NextPage } from "next";

import React from "react";

import Alert, { AlertDescription, AlertTitle } from "@/components/atoms/Alert";

export const metadata: Metadata = {
    alternates: {
        canonical: "/authentication/sign-in/SAML/",
    },
    title: "Log in via SSO",
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
