import RecoverEmailCredentialsForm from "@/components/auth/RecoverEmailCredentialsForm";

export default function Page() {
    return <>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-balance">
                    Herstel wachtwoord
                </h1>
                <p className="text-sm text-muted-foreground text-balance">
                    Gebruik jouw emailadres.
                </p>
            </div>
            <RecoverEmailCredentialsForm />
        </div>
    </>
}