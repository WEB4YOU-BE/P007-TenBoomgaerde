import type { Metadata, NextPage } from "next";

import React from "react";

import AddReservationForm from "./form";

export const metadata: Metadata = {
    alternates: {
        canonical: "/reservate/",
    },
    title: "Reserveren",
};

export const dynamic = "force-dynamic";

const Page: NextPage = () => (
    <main className={"container mx-auto max-w-(--breakpoint-lg) p-2"}>
        <AddReservationForm />
    </main>
);

export default Page;
