import ChangeOrganizationForm from "@/components/business/organizations/change-organization-form";

export default async function page({params}: { params: { organisationId: string } }) {
    return <main className={"mx-auto md:max-w-screen-sm p-2 flex flex-col gap-2"}>
        <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow whitespace-nowrap truncate"}>Organisatie
            wijzigen</h1>
        <ChangeOrganizationForm id={params.organisationId}/>
    </main>;
}