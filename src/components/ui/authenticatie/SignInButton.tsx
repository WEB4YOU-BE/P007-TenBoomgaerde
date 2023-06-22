"use client";

import {FC} from "react";
import {buttonVariants} from "@/components/ui/Button";
import {signIn} from "next-auth/react";

const SignInButton: FC = () => {
    return <button className={buttonVariants()} onClick={() => signIn()}>Log in</button>;
};

export default SignInButton;