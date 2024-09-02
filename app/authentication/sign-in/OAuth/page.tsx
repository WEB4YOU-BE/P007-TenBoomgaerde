import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/atoms/alert";

export const metadata: Metadata = {
    title: "Log in via derde partij",
    alternates: {
        canonical: "/authentication/sign-in/OAuth/",
    },
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
