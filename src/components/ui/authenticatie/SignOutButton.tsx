"use client";

import {FC} from "react";
import {buttonVariants} from "@/components/ui/Button";
import {signOut} from "next-auth/react";

const SignOutButton: FC = () => {
    return <button className={buttonVariants()} onClick={() => signOut()}>Log uit</button>;
};

export default SignOutButton;