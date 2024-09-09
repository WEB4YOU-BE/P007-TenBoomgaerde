import { Metadata } from "next";
import React from "react";

import SignUpWithEmailCredentialsForm from "./form";

export const metadata: Metadata = {
    alternates: {
        canonical: "/authentication/sign-up/Email/",
    },
    title: "Meld aan met email",
};

export default async function Page() {
    return <SignUpWithEmailCredentialsForm />;
}
