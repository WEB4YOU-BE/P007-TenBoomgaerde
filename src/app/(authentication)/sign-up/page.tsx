import {FC} from "react";
import SignUpSC from "@/components/ui/authenticatie/SignUpSC";

const page: FC = () => {
    return <main className={"h-full flex flex-col justify-center"}>
        <div className={"flex flex-row justify-center p-4"}>
            <SignUpSC/>
        </div>
    </main>;
};

export default page;