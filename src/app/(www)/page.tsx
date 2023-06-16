import Image from "next/image";

export default function Index() {
    return <main className={"w-full min-h-[100svh]"}>
        <figure className={"container mx-auto pt-5 flex flex-row justify-center"}>
            <Image className={"w-1/3"} src={"/images/tenboomgaerde.jpg"} alt={""} width={395} height={255}/>
        </figure>
        <section className={"container mx-auto grid grid-cols-1 md:grid-cols-3 gap-3"}>
            <div className={"flex flex-col gap-1 col-span-2"}>
                <h1 className={"text-4xl py-4"}>Ten Boomgaerde</h1>
                <p className={"text-base/7"}>Ten Boomgaerde is het beweging.net Dienstencentrum van Lichtervelde. Deze
                    zaal bevat een grote- en kleine zaal. Deze kunnen voor allerhande zaken zoals een clubfeest,
                    geboortereceptie, verjaardagsfeest, vergaderingen en communiefeest worden gereserveerd.</p>
                <p className={"text-base/7 text-red-700 pt-5"}>Uit respect voor de nachtrust van de buurtbewoners kunnen
                    er geen feesten met muziekinstallaties plaats vinden na 22u00.</p>
                <h2 className={"text-2xl pt-10 pb-2"}>Praktische info</h2>
                <h3 className={"text-xl pb-4"}>Accomodatie</h3>
                <ul role={"list"} className={"list-disc pl-5 space-y-2"}>
                    <li>Grote zaal: mogelijkheid om 100 personen aan tafels te plaatsen</li>
                    <li>Kleine zaal: mogelijkheid om 30 personen aan tafels te plaatsen</li>
                    <li>Keuken met voldoende frigo's en diepvriezer (klein formaat)</li>
                    <li>Sanitair</li>
                    <li>Parking voor 10 wagens en eveneens op 50m van de Marktplaats met ruime parkeermogelijkheden.
                    </li>
                </ul>
                <p className={"text-base/7 py-2"}>Het complex is volledig rookvrij (art.2 §1 van het KB van
                    15/05/90).</p>

            </div>
        </section>
    </main>;
}
