import { Alert, AlertDescription, AlertTitle } from "@/components/atoms/alert";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    alternates: {
        canonical: "/authentication/sign-up/OAuth/",
    },
    title: "Meld aan met derde partij",
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
