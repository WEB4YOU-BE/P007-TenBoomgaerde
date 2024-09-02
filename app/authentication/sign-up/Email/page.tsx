import { Metadata } from "next";

import SignUpWithEmailCredentialsForm from "./form";

export const metadata: Metadata = {
    title: "Meld aan met email",
    alternates: {
        canonical: "/authentication/sign-up/Email/",
    },
};

export default async function Page() {
    return <SignUpWithEmailCredentialsForm />;
}
