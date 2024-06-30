import Link from "next/link";
import { cn } from "@/utils/tailwindcss/MergeCN";
import {buttonVariants} from "@/components/atoms/button";

export default async function LoginButton() {
    return <Link href={"/login"} className={cn(buttonVariants(), "flex-shrink-0")}>Log in</Link>
}