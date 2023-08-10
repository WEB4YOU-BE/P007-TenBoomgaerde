import {FC} from "react";
import {redirect} from "next/navigation";
import {getAuthSession} from "@/librairy/authentication";
import {RedirectType} from "next/dist/client/components/redirect";
import SignUpCC from "@/components/ui/authenticatie/SignUpCC";

const SignInSC: FC = async () => {

    const session = await getAuthSession();
    if (session) redirect("/", RedirectType.replace);

    //TODO Add the client component to the return.
    return <SignUpCC/>;
};

export default SignInSC;