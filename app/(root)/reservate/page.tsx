import type { Metadata, NextPage } from "next";

import React from "react";

import Alert, { AlertDescription } from "@/components/atoms/Alert";

export const metadata: Metadata = {
    alternates: {
        canonical: "/reservate/",
    },
    title: "Reserveren",
};

export const dynamic = "force-dynamic";

const Page: NextPage = () => (
    <main className={"container mx-auto max-w-(--breakpoint-lg) p-2"}>
        <Alert>
            <AlertDescription>
                De website is momenteel in onderhoud. We werken hard om deze
                tegen 10 augustus weer beschikbaar te maken. Bedankt voor uw
                geduld!
            </AlertDescription>
        </Alert>
    </main>
);

export default Page;
