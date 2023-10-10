import InfoUserForm from "@/components/business/users/info-users-form";

export default async function page({params}: { params: { userId: string } }) {
    return <main className={"mx-auto p-4 lg:px-8 flex flex-col gap-4"}>
        <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow whitespace-nowrap truncate text-center"}>Gebruiker
            bekijken</h1>
        <InfoUserForm id={params.userId}/>
    </main>
}