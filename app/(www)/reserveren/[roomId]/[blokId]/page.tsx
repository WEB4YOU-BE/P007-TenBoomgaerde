import AddReservationForm from "@/components/Calendar/add-reservation-form";

export default function Index() {
    return <main className={"w-full min-h-[calc(100svh-72px)]"}>
        <div className={"md:w-1/2 mx-auto"}>
            <h1 className={"text-3xl font-bold text-center"}>Overzicht</h1>
            <div className={"grid grid-cols-2 w-1/2 my-4"}>
                <span className={"font-bold"}>Datum:</span>
                <span>20-09-2023</span>
                <span className={"font-bold"}>Tijd:</span>
                <span>13:00 - 17:00</span>
                <span className={"font-bold"}>Zaal:</span>
                <span>Kleine zaal</span>
            </div>
            <div className={"bg-red-100 border-red-400 border-2 rounded p-2 mb-8"}>Uit respect voor de nachtrust van de
                buurtbewoners kunnen er geen feesten met muziekinstallaties plaats vinden na 22u00.
            </div>
            <AddReservationForm/>
        </div>

    </main>;
}