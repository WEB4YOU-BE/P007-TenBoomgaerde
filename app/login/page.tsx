import Messages from './messages'
import {buttonVariants} from "@/components/ui/button";

export const dynamic = 'force-dynamic'

export default function Login() {
    return <form action={"/auth/sign-in"} method={"POST"}
                 className={"w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-lg border bg-white text-black grid gap-4 p-4"}>
        <Messages/>
        <div className={"flex flex-col gap-1"}>
            <label htmlFor={"email"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Email</label>
            <input required id={"email"} name={"email"} placeholder={"jij@voorbeeld.com"}
                   className={"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div className={"flex flex-col gap-1"}>
            <label htmlFor={"password"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Wachtwoord</label>
            <input required id={"password"} name={"password"} type={"password"} autoComplete={"current-password"} placeholder="••••••••"
                   className={"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <button className={buttonVariants()}>Login</button>
        <hr/>
        <button formAction="/auth/sign-up" className={buttonVariants({variant: "secondary"})}>Meld aan</button>
    </form>
}
