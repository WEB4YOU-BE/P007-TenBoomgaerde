import type { Metadata, NextPage } from "next";

import React from "react";

import SignUpWithEmailCredentialsForm from "./form";

export const metadata: Metadata = {
    alternates: {
        canonical: "/authentication/sign-up/Email/",
    },
    title: "Meld aan met email",
};

const Page: NextPage = () => <SignUpWithEmailCredentialsForm />;

export default Page;
