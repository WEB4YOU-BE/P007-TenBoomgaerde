import Image from "next/image";

export default async function Index() {
    return <main className={"w-full min-h-[calc(100svh-72px)]"}>
        <div className={"container mx-auto grid lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4"}>
            <div className={"xl:col-span-2 flex flex-col gap-2"}>
                <h1 className={"text-5xl font-extrabold"}>Ten boomgaarde</h1>
                <span className={"bg-red-100 border-red-400 border-2 rounded p-2"}>Uit respect voor de nachtrust van de buurtbewoners kunnen er geen feesten met muziekinstallaties plaats vinden na 22u00.</span>
                <p>Ten Boomgaerde is het beweging.net Dienstencentrum van Lichtervelde. Deze
                    zaal bevat een grote- en kleine zaal. Deze kunnen voor allerhande zaken zoals een clubfeest,
                    geboortereceptie, verjaardagsfeest, vergaderingen en communiefeest worden gereserveerd.</p>
            </div>
            <div className={"h-full aspect-video md:aspect-auto relative"}>
                <Image priority className={"object-cover rounded"} src={"/images/tenboomgaerde.jpg"} alt={"Foto van het gebouw"} fill/>
            </div>
            <aside className={"lg:col-start-2 xl:col-start-3 flex flex-col gap-2"}>
                <h2 className={"text-3xl font-bold lg:text-center"}>Beschikbaarheid</h2>
                <div className={"bg-gray-200 flex-grow min-h-[calc((100svh-72px-1rem)/2)] rounded p-2"}>React Kalender</div>
                {/* h-[calc(100svh-72px-1rem)] */}
            </aside>
            <section className={"lg:row-start-2 lg:col-span-1 xl:col-span-2 flex flex-col gap-2"}>
                <h2 className={"text-3xl font-bold"}>Praktische info</h2>
                <h3 className={"text-xl font-semibold"}>Accomodatie</h3>
                <ul role={"list"} className={"list-disc pl-5 space-y-1"}>
                    <li>Grote zaal: mogelijkheid om 100 personen aan tafels te plaatsen</li>
                    <li>Kleine zaal: mogelijkheid om 30 personen aan tafels te plaatsen</li>
                    <li>Keuken met voldoende frigo&apos;s en diepvriezer (klein formaat)</li>
                    <li>Sanitair</li>
                    <li>Parking voor 10 wagens en eveneens op 50m van de Marktplaats met ruime parkeermogelijkheden.</li>
                </ul>
                <p className={"font-light"}>Het complex is volledig rookvrij (art.2 §1 van het KB van 15/05/90).</p>
                <h3 className={"text-xl font-semibold"}>Voorzieningen</h3>
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
                <h3 className={"text-xl font-semibold"}>Bereikbaarheid</h3>
                <p>Het adres van het dienstencentrum is Boomgaardstraat 4a te 8810
                    Lichtervelde. Dit is te bereiken via: Afrit 9 van de E403. Richting centrum Lichtervelde volgen.
                    Eénmaal op de Marktplaats aangekomen, rijdt u rechts van het gemeentehuis de Torhoustraat in. Na 20
                    meter opnieuw naar rechts de Boomgaardstraat in. Op 30 meter rechts vindt u zaal Ten Boomgaerde.</p>
            </section>
        </div>
    </main>;
}
