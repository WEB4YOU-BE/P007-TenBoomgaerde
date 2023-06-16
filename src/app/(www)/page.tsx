import Image from "next/image";

export default function Index() {
    return <main className={"w-full min-h-[100svh]"}>
        <figure className={"container mx-auto pt-5 flex flex-row justify-center"}>
            <Image className={"lg:w-1/3"} src={"/images/tenboomgaerde.jpg"} alt={""} width={395} height={255}/>
        </figure>
        <section className={"container mx-auto p-2 grid grid-cols-1 md:grid-cols-3 gap-3"}>
            <div className={"flex flex-col col-span-2"}>
                <h1 className={"text-4xl py-3"}>Ten Boomgaerde</h1>
                <p className={"text-base/7"}>Ten Boomgaerde is het beweging.net Dienstencentrum van Lichtervelde. Deze
                    zaal bevat een grote- en kleine zaal. Deze kunnen voor allerhande zaken zoals een clubfeest,
                    geboortereceptie, verjaardagsfeest, vergaderingen en communiefeest worden gereserveerd.</p>
                <p className={"text-base/7 text-red-700 pt-5"}>Uit respect voor de nachtrust van de buurtbewoners kunnen
                    er geen feesten met muziekinstallaties plaats vinden na 22u00.</p>
            </div>
            <div className={"flex flex-col"}>
                <h2 className={"text-2xl py-4 flex flew-row md:justify-center"}>Beschikbaarheid</h2>
                <div>Hier komt de agenda of lijst</div>
            </div>
            <div className={"flex flex-col col-span-2"}>
                <h2 className={"text-2xl pt-10 pb-2"}>Praktische info</h2>
                <h3 className={"text-xl pb-3"}>Accomodatie</h3>
                <ul role={"list"} className={"list-disc pl-5 space-y-1"}>
                    <li>Grote zaal: mogelijkheid om 100 personen aan tafels te plaatsen</li>
                    <li>Kleine zaal: mogelijkheid om 30 personen aan tafels te plaatsen</li>
                    <li>Keuken met voldoende frigo's en diepvriezer (klein formaat)</li>
                    <li>Sanitair</li>
                    <li>Parking voor 10 wagens en eveneens op 50m van de Marktplaats met ruime parkeermogelijkheden.
                    </li>
                </ul>
                <p className={"text-base/7 py-2"}>Het complex is volledig rookvrij (art.2 §1 van het KB van
                    15/05/90).</p>
                <h3 className={"text-xl pt-7 pb-3"}>Voorzieningen</h3>
                <ul role={"list"} className={"list-disc pl-5 space-y-1"}>
                    <li>Internet toegang (free wifi)</li>
                    <li>Keukenmateriaal voorzien op 100 personen</li>
                    <li>Wijnglazen</li>
                    <li>Aperitiefglazen</li>
                    <li>koffieperculator</li>
                    <li>Microgolf</li>
                    <li>Receptietafels</li>
                    <li>Beamer</li>
                    <li>Schrijfbord</li>
                    <li>Mobiel podium</li>
                </ul>
                <h3 className={"text-xl pt-7 pb-3"}>Bereikbaarheid</h3>
                <p className={"text-base/7 py-2"}>Het adres van het dienstencentrum is Boomgaardstraat 4a te 8810
                    Lichtervelde. Dit is te bereiken via: Afrit 9 van de E403. Richting centrum Lichtervelde volgen.
                    Eénmaal op de Marktplaats aangekomen, rijdt u rechts van het gemeentehuis de Torhoustraat in. Na 20
                    meter opnieuw naar rechts de Boomgaardstraat in. Op 30 meter rechts vindt u zaal Ten Boomgaerde.</p>
            </div>
        </section>
    </main>;
}
