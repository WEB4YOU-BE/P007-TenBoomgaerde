import ChangeBlokForm from "@/components/business/reservations/bloks/change-blok-form";

export default async function page({params}: { params: { blokId: string } }) {
    return <main className={"mx-auto md:max-w-screen-sm p-2 flex flex-col gap-2"}>
        <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow whitespace-nowrap truncate pb-2"}>Zaal
            wijzigen</h1>
        <ChangeBlokForm id={params.blokId}/>
    </main>;
}