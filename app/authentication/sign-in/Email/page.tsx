import { Metadata } from "next";
import React from "react";

import SignInWithEmailCredentialsForm from "./form";

export const metadata: Metadata = {
    alternates: {
        canonical: "/authentication/sign-in/Email/",
    },
    title: "Log in via email",
};

export default async function Page() {
    return <SignInWithEmailCredentialsForm />;
}
