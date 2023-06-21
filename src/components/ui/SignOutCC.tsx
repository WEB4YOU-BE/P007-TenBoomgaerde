"use client";

import {FC} from "react";
import {signOut} from "next-auth/react";

const SignOutCC: FC = async () => {
    await signOut();
    return <></>;
};

export default SignOutCC;