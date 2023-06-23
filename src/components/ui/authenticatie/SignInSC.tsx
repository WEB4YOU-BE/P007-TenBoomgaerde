import {FC} from "react";
import {redirect} from "next/navigation";
import {getAuthSession} from "@/librairy/authentication";
import SignInCC from "@/components/ui/authenticatie/SignInCC";
import {RedirectType} from "next/dist/client/components/redirect";

const SignInSC: FC = async () => {

    const session = await getAuthSession();
    if (session) redirect("/", RedirectType.replace);

    return <SignInCC/>;
};

export default SignInSC;