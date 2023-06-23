"use client";

import {FC, FormEventHandler, useState} from "react";
import Link from "next/link";
import {signIn} from "next-auth/react";
import {useToast} from "@/hooks/use-toast";
import {buttonVariants} from "@/components/ui/Button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/Card";
import {useSearchParams} from "next/navigation";

const SignInCC: FC = () => {

    const searchParams = useSearchParams();
    const callbackURL = searchParams.get("callbackUrl");

    const [credentials, setCredentials] = useState({username: "", password: ""});

    const onSignInWithCredentials: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const result = await signIn("credentials", {...credentials, redirect: true, callbackUrl: callbackURL || "/"});
    };

    return <Card className={"max-w-screen-sm"}>
        <CardHeader>
            <CardTitle>Welkom terug</CardTitle>
            <CardDescription>Meld je aan met jouw gebruikersnaam en wachtwoord</CardDescription>
        </CardHeader>
        <CardContent>
            <form id={"sign-in-form"} onSubmit={onSignInWithCredentials} className={"grid w-full items-center gap-4"}>
                <div className="flex flex-col space-y-1.5">
                    <label className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"} htmlFor="username">Gebruikersnaam</label>
                    <input
                        className={"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                        value={credentials.username} onChange={({target}) => setCredentials({...credentials, username: target.value})}
                        id="username" type={"text"} autoComplete={"username"} required autoFocus placeholder="Jouw gebruikersnaam of email"/>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <label className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"} htmlFor="password">Wachtwoord</label>
                    <input
                        className={"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                        value={credentials.password} onChange={({target}) => setCredentials({...credentials, password: target.value})}
                        id="password" type={"password"} autoComplete={"password"} required placeholder="Jouw wachtwoord"/>
                </div>
            </form>
        </CardContent>
        <CardFooter className="flex justify-between">
            <Link className={buttonVariants({variant: "secondary"})} href={"/sign-up"}>Maak een account</Link>
            <button type={"submit"} form={"sign-in-form"} className={buttonVariants()}>Meld aan</button>
        </CardFooter>
    </Card>;
};
/*
const SignInCC: FC = () => {

    const {toast} = useToast();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [credentials, setCredentials] = useState({username: "", password: ""});

    const signInWithCredentials: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const result = await signIn("credentials", {...credentials, redirect: false});
            if (!result) throw new Error("Wat er precies mis ging is niet helemaal duidelijk.");
            if (result.error) throw new Error(result.error);
            if (result.ok) router.replace("/");
        } catch (error) {
            toast({
                title: "Er ging iets mis!",
                description: `${error}`,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return <Card className={"max-w-screen-sm"}>
        <CardHeader>
            <CardTitle>Welkom terug</CardTitle>
            <CardDescription>Meld je aan met jouw gebruikersnaam en wachtwoord</CardDescription>
        </CardHeader>
        <CardContent>
            <form id={"sign-in-form"} onSubmit={signInWithCredentials} className={"grid w-full items-center gap-4"}>
                <div className="flex flex-col space-y-1.5">
                    <label className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"} htmlFor="username">Gebruikersnaam</label>
                    <input
                        className={"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                        value={credentials.username} onChange={({target}) => setCredentials({...credentials, username: target.value})}
                        id="username" type={"text"} autoComplete={"username"} required autoFocus placeholder="Jouw gebruikersnaam of email"/>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <label className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"} htmlFor="password">Wachtwoord</label>
                    <input
                        className={"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                        value={credentials.password} onChange={({target}) => setCredentials({...credentials, password: target.value})}
                        id="password" type={"password"} autoComplete={"password"} required placeholder="Jouw wachtwoord"/>
                </div>
            </form>
        </CardContent>
        <CardFooter className="flex justify-between">
            <Link className={buttonVariants({variant: "secondary"})} href={"/sign-up"}>Maak een account</Link>
            <button type={"submit"} form={"sign-in-form"} className={buttonVariants()} disabled={isLoading}>Meld aan</button>
        </CardFooter>
    </Card>;
};
*/

export default SignInCC;