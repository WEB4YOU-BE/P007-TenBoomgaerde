'use client'

import Link from "next/link";

export default function Index() {
    const categories = [
        {id: 1, name: "Drank"},
        {id: 2, name: "Materiaal"},
    ]

    return <main className={"w-full min-h-[100svh]"}>
        <div className={"p-4 block sm:flex items-center justify-between"}>
            <div className={"w-full mb-1"}>
                <div className={"mb-4"}>
                    <h1 className={"text-2xl font-semibold text-gray-900 sm:text-3xl"}>Categorie toevoegen/wijzigen</h1>
                </div>
                <form
                    className={"grid grid-cols-2 w-full gap-4 p-4 my-4 border border-gray-200 rounded-lg shadow-sm"}>
                    <label
                        className={" my-auto font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-4 "}
                    >Naam</label>
                    <input
                        className={"h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                        id="productNaam" type={"text"} required
                        value={categories[1].name}/>
                    <div className={"col-start-2 flex flex-row justify-between"}>
                        <Link href={`/dashboard/producten/categorien`}
                              className={"items-center px-3 py-2 text-sm font-medium text-center rounded-lg bg-green-200 hover:bg-green-300 focus:ring-4 focus:ring-green-300"}>Terug</Link>
                        <Link href={`/dashboard/producten/categorien`} type={"submit"}
                              className={"items-center px-3 py-2 text-sm font-medium text-center rounded-lg bg-green-200 hover:bg-green-300 focus:ring-4 focus:ring-green-300"}>Opslaan</Link>
                    </div>
                </form>
            </div>
        </div>
    </main>;
}
