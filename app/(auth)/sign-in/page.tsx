import SignInWithEmailCredentialsForm from "@/components/auth/SignInWithEmailCredentialsForm";
import Link from "next/link";

export default function Page() {
    return <>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-balance">
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
    </>
}