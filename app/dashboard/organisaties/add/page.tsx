import AddOrganizationForm from "@/components/business/organizations/add-organization-form";

export default async function page() {
    return <main className={"mx-auto md:max-w-screen-sm p-2 flex flex-col gap-2"}>
        <h1 className={"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow flex-shrink-0 pb-2"}>Voeg
            een organisatie toe</h1>
        <AddOrganizationForm/>
    </main>
}