import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    alternates: {
        canonical: "/reservate/",
    },
    title: "Reserveren",
};

export const dynamic = "force-dynamic";

export default async function Page() {
    return <></>;
}
