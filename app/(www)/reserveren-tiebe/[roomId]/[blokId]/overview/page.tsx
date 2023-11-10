import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Link from "next/link";

export default function Index() {
    return <main className={"w-full min-h-[calc(100svh-72px)]"}>
        <div className={"lg:w-1/2 mx-auto"}>
            <h1 className={"text-3xl font-bold text-center"}>Overzicht</h1>
            <div className={"grid grid-cols-2 lg:w-1/2 my-4"}>
                <span className={"font-bold"}>Datum:</span>
                <span>20-09-2023</span>
                <span className={"font-bold"}>Tijd:</span>
                <span>13:00 - 17:00</span>
                <span className={"font-bold"}>Zaal:</span>
                <span>Kleine zaal</span>
                <span className={"font-bold"}>Extra's:</span>
                <span>Drank, Beamer</span>
            </div>
            <h2 className={"text-xl font-bold text-center"}>Uw gegevens</h2>
            <div className={"grid grid-cols-2 lg:w-1/2 my-4"}>
                <span className={"font-bold"}>Naam:</span>
                <span>Voornaam familienaam</span>
                <span className={"font-bold"}>Email:</span>
                <span>naam@voorbeeld.be</span>
                <span className={"font-bold"}>Gsm-nummer:</span>
                <span>0123 45 67 89</span>
                <span className={"font-bold"}>Straat en huisnr</span>
                <span>Straatnaam en nummer</span>
                <span className={"font-bold"}>Woonplaats</span>
                <span>Gemeente of stad</span>
                <span className={"font-bold"}>Omschrijving</span>
                <span>Soort event</span>
                <span className={"font-bold"}>Organistie</span>
                <span>Beweging.net</span>
                <span className={"font-bold"}>BTW-nummer</span>
                <span>BE 1234 456 789</span>
            </div>
            <div className={"flex justify-end my-8"}>
                <Link href={"/bevestiging"} className={cn(buttonVariants({variant: "green"}), "w-1/3")}>Bevestig</Link>
            </div>
            <div className={"bg-red-100 border-red-400 border-2 rounded p-2 mb-8"}>Na klikken op bevestigen krijgt u een
                mail met dat uw reservatie is aangevraagd. Pas na dat we uw reservatie hebben goedgekeurd is uw
                reservatie bevestigd.
            </div>
        </div>
    </main>;
}