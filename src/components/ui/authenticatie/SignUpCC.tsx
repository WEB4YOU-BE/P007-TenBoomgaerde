"use client";

import {FC, FormEventHandler, useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/Card";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/Button";

const SignUpCC: FC = () => {
    const [credentials, setCredentials] = useState({username: "", password: "", confirmedPassword: ""});
    const [userInfo, setUserInfo] = useState({firstname: "", lastname: ""});

    const onSignUpWithCredentials: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
    };

    return <Card className={"min-w-[30svw] max-w-screen-sm"}>
        <CardHeader>
            <CardTitle>Maak een account</CardTitle>
            <CardDescription>Maak jouw account voor VZW Ten Boomgaerde aan</CardDescription>
        </CardHeader>
        <CardContent>
            <form id={"sign-up-form"} onSubmit={onSignUpWithCredentials} className={"grid grid-cols-1 md:grid-cols-2 w-full items-center gap-4"}>
                <div className="flex flex-col space-y-1.5">
                    <label className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"} htmlFor="firstname">Voornaam</label>
                    <input
                        className={"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                        value={userInfo.firstname} onChange={({target}) => setUserInfo({...userInfo, firstname: target.value})}
                        id="firstname" type={"text"} autoComplete={"given-name"} required autoFocus placeholder={"Jouw voornaam"}/>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <label className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"} htmlFor="lastname">Familienaam</label>
                    <input
                        className={"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                        value={userInfo.lastname} onChange={({target}) => setUserInfo({...userInfo, lastname: target.value})}
                        id="lastname" type={"text"} autoComplete={"family-name"} required placeholder={"Jouw familienaam"}/>
                </div>
                <div className="md:col-span-2 flex flex-col space-y-1.5">
                    <label className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"} htmlFor="username">Gebruikersnaam</label>
                    <input
                        className={"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                        value={credentials.username} onChange={({target}) => setCredentials({...credentials, username: target.value})}
                        id="username" type={"text"} autoComplete={"username"} required autoFocus placeholder="Jouw gebruikersnaam of email"/>
                </div>
                <div className="md:col-span-2 flex flex-col space-y-1.5">
                    <label className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"} htmlFor="password">Wachtwoord</label>
                    <input
                        className={"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                        value={credentials.password} onChange={({target}) => setCredentials({...credentials, password: target.value})}
                        id="password" type={"password"} autoComplete={"new-password"} required placeholder="Jouw wachtwoord"/>
                </div>
                <div className="md:col-span-2 flex flex-col space-y-1.5">
                    <label className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"} htmlFor="new-password">Bevestig wachtwoord</label>
                    <input
                        className={"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                        value={credentials.confirmedPassword} onChange={({target}) => setCredentials({...credentials, confirmedPassword: target.value})}
                        id="new-password" type={"password"} autoComplete={"new-password"} required placeholder="Bevestig wachtwoord"/>
                </div>
            </form>
        </CardContent>
        <CardFooter className="flex justify-between">
            <Link className={buttonVariants({variant: "secondary"})} href={"/sign-in"}>Ik heb er al één!</Link>
            <button type={"submit"} form={"sign-up-form"} className={buttonVariants()}>Meld aan</button>
        </CardFooter>
    </Card>;
};

export default SignUpCC;