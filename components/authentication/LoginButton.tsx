import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";

export default async function LoginButton() {
    return <Link href={"/login"} className={cn(buttonVariants(), "flex-shrink-0")}>Log in</Link>
}