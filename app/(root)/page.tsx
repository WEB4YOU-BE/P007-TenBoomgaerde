import { Alert, AlertDescription } from "@/components/atoms/alert";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
    alternates: {
        canonical: "/",
    },
    title: "VZW Ten Boomgaerde Lichtervelde",
};

export const dynamic = "force-dynamic";

export default async function Page() {
    return (
        <div className="container mx-auto max-w-(--breakpoint-lg) my-8">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Ten Boomgaerde
            </h1>
            <p className="leading-7 not-first:mt-6">
                Ten Boomgaerde vzw heet u van harte welkom in ons
                vergadercentrum in Lichtervelde.
            </p>
            <p className="leading-7 not-first:mt-6">
                Dit complex bevat een grote- en kleine zaal, die verhuurd worden
                voor allerhande evenementen zoals:
            </p>
            <ul className="ml-6 mt-2 list-disc [&>li]:mt-2">
                <li>Vergaderingen</li>
                <li>
                    Activiteiten van verenigingen (bv. vormingsessies, crea,
                    etc.)
                </li>
                <li>
                    Feesten (geboortereceptie, verjaardag, communie, kerst,
                    etc.)
                </li>
            </ul>
            <Image
                alt="Foto van het gebouw"
                className="aspect-video rounded object-cover not-first:mt-6"
                height={900}
                priority
                src="/images/tenboomgaerde.jpg"
                width={1600}
            />
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Praktische informatie
            </h2>
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                Accomodatie
            </h3>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>
                    Grote zaal: mogelijkheid om 100 personen aan tafels te
                    plaatsen
                </li>
                <li>
                    Kleine zaal: mogelijkheid om 30 personen aan tafels te
                    plaatsen
                </li>
                <li>Keuken met voldoende frigo&apos;s en diepvriezer</li>
                <li>Sanitair (ook voor mindervaliden)</li>
                <li>
                    Inkom & vestiaire bij grote zaal (in kleine zaal zijn
                    hangers voorzien)
                </li>
            </ul>
            <p className="font-extralight leading-7 not-first:mt-6">
                Het complex is volledig rookvrij (art.2 §1 van het KB van
                15/05/90).
            </p>
            <p className="leading-7 not-first:mt-6">
                Onze zalen zijn volledig rolstoeltoegankelijk.
            </p>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                Voorzieningen
            </h3>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
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
                <li>
                    Afvalvoorziening voor REST en PMD. Alle andere afval, zoals
                    bijvoorbeeld: glas, papier &amp; karton, organisch
                    afval&hellip; dient door de huurder terug meegenomen te
                    worden na gebruik van de zaal.
                </li>
            </ul>
            <p className="leading-7 not-first:mt-6">
                Extra glazen kunnen aangevraagd worden bij reservering van de
                zaal. Alle andere benodigdheden dienen zelf meegebracht te
                worden.
            </p>
            <Alert className="not-first:mt-6" variant={"destructive"}>
                <AlertDescription>
                    Uit respect voor de nachtrust van de buurtbewoners kunnen er
                    geen feesten met muziekinstallaties plaats vinden na 22u00.
                </AlertDescription>
            </Alert>

            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                Bereikbaarheid
            </h3>
            <p className="leading-7 not-first:mt-6">
                Het gps-adres Ten Boomgaerde is Boomgaardstraat 4a te 8810
                Lichtervelde
            </p>
            <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
                Met de wagen
            </h4>
            <p className="leading-7 not-first:mt-6">
                Afrit 9 van de E403. Richting centrum Lichtervelde volgen.
                Eénmaal op de Marktplaats aangekomen, rijdt u rechts van het
                gemeentehuis de Torhoustraat in. Na 20 meter opnieuw naar rechts
                de Boomgaardstraat in. Op 30 meter rechts vindt u zaal Ten
                Boomgaerde.
            </p>
            <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
                Parking
            </h4>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>10 staanplaatsen op de site zelf.</li>
                <li>
                    Ruime parkings op wandelafstand: Markt, Pastorietuin, etc.
                </li>
                <li>
                    Er is mogelijkheid tot het plaatsen van een foodtruck op de
                    parkeerplaatsen.
                </li>
                <li>Fietsbeugels</li>
            </ul>
            <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
                Met openbaar vervoer
            </h4>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>Station Lichtervelde op 15 minuten wandelen.</li>
                <li>
                    Dichtstbijzijnde bushalte: Lichtervelde Astridlaan op 5
                    minuten wandelen.
                </li>
            </ul>
        </div>
    );
}
