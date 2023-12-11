import Image from "next/image";

export const dynamic = 'force-dynamic'

export const metadata = {
    description: 'Ga naar jouw overzicht met alle reserveren VZW Ten Boomgaerde Lichtervelde.',

    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    applicationName: "VZW Ten Boomgaerde Lichtervelde",
    keywords: ["Ten Boomgaerde", "Lichtervelde", "VZW"],

    creator: "WEB4YOU",
    publisher: "WEB4YOU",
    authors: [{name: "Jens Penneman", url: "https://jenspenneman.com"}],

    formatDetection: {
        url: false,
        email: false,
        telephone: false,
        address: false,
        date: false,
    },

    metadataBase: new URL("https://www.vzwtenboomgaerdelichtervelde.be"),
    referrer: "origin-when-cross-origin",
    alternates: {
        canonical: "/",
        languages: {},
    },

    appleWebApp: {
        title: "VZW Ten Boomgaerde Lichtervelde",
        statusBarStyle: "default",
    },

    generator: "Next.js",
};

export default async function Index() {
    return <main className={"min-h-[calc(100svh-72px)]"}>
        <div className={"container max-w-screen-xl mx-auto grid lg:grid-cols-2 xl:grid-cols-3 gap-4 px-4"}>
            <div className={"xl:col-span-2 flex flex-col gap-4 pb-6"}>
                <h1 className={"text-5xl font-extrabold"}>Ten boomgaerde</h1>
                <p>Ten Boomgaerde vzw heet u van harte welkom in ons vergadercentrum in Lichtervelde.</p>
                <p>Dit complex bevat een grote- en kleine zaal, die verhuurd worden voor allerhande evenementen
                    zoals: </p>
                <ul role={"list"} className={"list-disc pl-5 space-y-1"}>
                    <li>Vergaderingen</li>
                    <li>Activiteiten van verenigingen (bv. vormingsessies, crea, etc.)</li>
                    <li>Feesten (geboortereceptie, verjaardag, communie, kerst, etc.)</li>
                </ul>
            </div>
            <div className={"h-full aspect-video md:aspect-auto relative"}>
                <Image priority className={"object-cover rounded"} src={"/images/tenboomgaerde.jpg"} alt={"Foto van het gebouw"} fill/>
            </div>
            <aside className={"lg:col-start-2 xl:col-start-3 flex flex-col gap-2"}>
                <h2 className={"text-3xl font-bold lg:text-center"}>Beschikbaarheid</h2>
                <div className={"bg-gray-200 flex-grow min-h-[calc((100svh-72px-1rem)/2)] rounded p-2"}>React Kalender</div>
            </aside>
            <section className={"lg:row-start-2 lg:col-span-1 xl:col-span-2 flex flex-col gap-4"}>
                <h2 className={"text-3xl font-bold"}>Praktische info</h2>
                <h3 className={"text-xl font-semibold"}>Accomodatie</h3>
                <ul role={"list"} className={"list-disc pl-5 space-y-1"}>
                    <li>Grote zaal: mogelijkheid om 100 personen aan tafels te plaatsen</li>
                    <li>Kleine zaal: mogelijkheid om 30 personen aan tafels te plaatsen</li>
                    <li>Keuken met voldoende frigo&apos;s en diepvriezer</li>
                    <li>Sanitair (ook voor mindervaliden)</li>
                    <li>Inkom & vestiaire bij grote zaal (in kleine zaal zijn hangers voorzien)</li>
                </ul>
                <p className={"font-light"}>Het complex is volledig rookvrij (art.2 §1 van het KB van 15/05/90).</p>
                <p>Onze zalen zijn volledig rolstoeltoegankelijk</p>
                <h3 className={"text-xl font-semibold"}>Voorzieningen</h3>
                <ul role={"list"} className={"list-disc pl-5 space-y-1"}>
                    <li>Wifi</li>
                    <li>Uitgebreid drankaanbod</li>
                    <li>Keukenmateriaal voorzien op 100 personen</li>
                    <li>Wijnglazen</li>
                    <li>Aperitiefglazen</li>
                    <li>koffieperculator</li>
                    <li>Microgolf</li>
                    <li>Receptietafels</li>
                    <li>Beamer</li>
                    <li>Schrijfbord</li>
                    <li>Mobiel podium</li>
                    <li>Afvalvoorziening voor REST en PMD, alle andere afval (bv. Glas, Papier&Karton, Organisch afval)
                        dient door de huurder terug meegenomen te worden na gebruik van de zaal.
                    </li>
                </ul>
                <p>Extra glazen kunnen aangevraagd worden bij reservering van de zaal. Alle andere benodigdheden dienen
                    zelf meegebracht te worden. </p>
                <span className={"bg-red-100 border-red-400 border-2 rounded p-2"}>Uit respect voor de nachtrust van de buurtbewoners kunnen er geen feesten met muziekinstallaties plaats vinden na 22u00.</span>
                <h3 className={"text-xl font-semibold"}>Bereikbaarheid</h3>
                <p>Het gps-adres Ten Boomgaerde is Boomgaardstraat 4a te 8810 Lichtervelde</p>
                <span className={"underline"}>Met de wagen</span>
                <p>Afrit 9 van de E403. Richting centrum Lichtervelde volgen. Eénmaal op de Marktplaats aangekomen,
                    rijdt u rechts van het gemeentehuis de Torhoustraat in. Na 20 meter opnieuw naar rechts de
                    Boomgaardstraat in. Op 30 meter rechts vindt u zaal Ten Boomgaerde.</p>
                <span className={"underline"}>Parking</span>
                <ul role={"list"} className={"list-disc pl-5 space-y-1"}>
                    <li>10 staanplaatsen op de site zelf.</li>
                    <li>Ruime parkings op wandelafstand: Markt, Pastorietuin, etc.</li>
                    <li>Er is mogelijkheid tot het plaatsen van een foodtruck op de parkeerplaatsen.</li>
                    <li>Fietsbeugels</li>
                </ul>
                <span className={"underline"}>Met openbaar vervoer</span>
                <ul role={"list"} className={"list-disc pl-5 space-y-1"}>
                    <li>Station Lichtervelde op 15 minuten wandelen.</li>
                    <li>Dichtstbijzijnde bushalte: Lichtervelde Astridlaan op 5 minuten wandelen.</li>
                </ul>
            </section>
        </div>
    </main>;
}
