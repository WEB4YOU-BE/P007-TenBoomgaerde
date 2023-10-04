import InfoReservationForm from "@/components/business/reservations/info-reservation-form";

export default async function page({params}: {
    params: {
        reservatieId: string
    }
}) {
    return <main className={"mx-auto p-4 lg:px-8 flex flex-col gap-4"}>
        <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow whitespace-nowrap truncate text-center"}>Reservatie
            bekijken</h1>
        <InfoReservationForm id={params.reservatieId}/>
    </main>
}