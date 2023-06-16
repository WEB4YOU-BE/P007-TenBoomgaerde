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
            </div>
        </section>
    </main>;
}
