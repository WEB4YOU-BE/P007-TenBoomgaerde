import SignInWithEmailCredentialsForm from "@/components/auth/SignInWithEmailCredentialsForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/tailwindcss/twMergeCN";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return <>
        <div className="container relative h-[100vh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Image src={"/images/Logo Ten Boomgaerde.PNG"} alt={"Logo"} width={77} height={77}
                        className={"aspect-square mr-2 h-8 w-8 rounded-full"} />
                    VZW Ten Boomgaerde Lichtervelde
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg text-balance">
                            &ldquo;Deze website maakt het ons vele malen makkelijker om een reservering te ontvangen, verwerken en accepteren.&rdquo;
                        </p>
                        <footer className="text-sm">Guy Beeusaert</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Log in jouw account
                        </h1>
                        <p className="text-sm text-muted-foreground text-balance">
                            Gebruik jouw emailadres en wachtwoord.
                        </p>
                    </div>
                    <SignInWithEmailCredentialsForm />
                    <p className="px-8 text-center text-sm text-muted-foreground text-balance">
                        Door op Log in te klikken, gaat u akkoord met onze{" "}
                        <Link
                            href="/terms"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Servicevoorwaarden
                        </Link>{" "}
                        en ons{" "}
                        <Link
                            href="/privacy"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Privacybeleid
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    </>
}