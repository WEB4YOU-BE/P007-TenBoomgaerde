import {buttonVariants} from "@/components/atoms/button";
import { cn } from "@/utils/tailwindcss/MergeCN";

export default function LogoutButton() {
    return (
        <form action="/auth/sign-out" method="post" className={"flex"}>
            <button className={cn(buttonVariants(), "flex-shrink-0 flex-grow")}>
                Log uit
            </button>
        </form>
    )
}
