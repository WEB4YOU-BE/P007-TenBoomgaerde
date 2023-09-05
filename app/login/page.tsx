import Messages from './messages'

export default function Login() {
    return <form action={"/auth/sign-in"} method={"POST"}
                 className={"rounded-lg border bg-white text-black grid gap-4 p-4"}>
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
        <button>Login</button>
    </form>

    /*
    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <Link
                href="/"
                className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                >
                    <polyline points="15 18 9 12 15 6"/>
                </svg>
                {' '}
                Back
            </Link>

            <form
                className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                action="/auth/sign-in"
                method="post"
            >
                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="email"
                    placeholder="you@example.com"
                    required
                />
                <label className="text-md" htmlFor="password">
                    Password
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                />
                <button className="bg-green-700 rounded px-4 py-2 text-white mb-2">
                    Sign In
                </button>
                <button
                    formAction="/auth/sign-up"
                    className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
                >
                    Sign Up
                </button>
                <Messages/>
            </form>
        </div>
    )
     */
}
