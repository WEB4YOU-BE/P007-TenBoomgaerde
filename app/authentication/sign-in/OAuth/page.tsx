import Alert, { AlertDescription, AlertTitle } from "@/components/atoms/Alert";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    alternates: {
        canonical: "/authentication/sign-in/OAuth/",
    },
    title: "Log in via derde partij",
};

export default async function Page() {
    return (
        <>
            <Alert>
                <AlertTitle>Komt binnenkort!</AlertTitle>
                <AlertDescription>
                    Deze functie is nog niet beschikbaar.
                </AlertDescription>
            </Alert>
        </>
    );
}
