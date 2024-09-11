import { Metadata } from "next";
import React from "react";

import SignOutForm from "./form";

export const metadata: Metadata = {
    alternates: {
        canonical: "/authentication/sign-out/",
    },
    title: "Log uit",
};

export default async function Page() {
    return <SignOutForm />;
}
