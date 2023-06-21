import {FC} from "react";
import {redirect} from "next/navigation";
import {getAuthSession} from "@/librairy/authenticationOptions";
import SignInCC from "@/components/ui/SignInCC";

const SignInSC: FC = async () => {

    const session = await getAuthSession();
    if (session) redirect("/");

    return <SignInCC/>;
};

export default SignInSC;