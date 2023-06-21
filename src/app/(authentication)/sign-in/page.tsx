import {FC} from "react";
import SignInSC from "@/components/ui/SignInSC";

const page: FC = () => {
    return <main className={"h-full flex flex-col justify-center"}>
        <div className={"flex flex-row justify-center p-4"}>
            <SignInSC/>
        </div>
    </main>;
};

export default page;