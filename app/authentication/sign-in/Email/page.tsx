import type { Metadata, NextPage } from "next";

import React from "react";

import SignInWithEmailCredentialsForm from "./form";

export const metadata: Metadata = {
    alternates: {
        canonical: "/authentication/sign-in/Email/",
    },
    title: "Log in via email",
};

const Page: NextPage = () => <SignInWithEmailCredentialsForm />;

export default Page;
