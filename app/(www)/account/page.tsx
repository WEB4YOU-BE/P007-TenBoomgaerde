import UserForm from "@/components/business/users/user-form";

export default async function page() {
    return <main className={"container max-w-screen-xl mx-auto p-2 px-4 min-h-[calc(100svh-72px)]"}>
        <h1 className={"text-4xl font-bold text-center mb-8"}>Gebruikersinformatie</h1>
        <div className={"w-full flex"}>
            <UserForm/>
        </div>
    </main>
}