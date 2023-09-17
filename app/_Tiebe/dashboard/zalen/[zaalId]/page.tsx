import {Switch} from "@/components/ui/Switch";
import Link from "next/link";

export default function Index() {
    const zaal = [
        {id: 1, name: 'Kleine zaal', private: false, dayPrice: 150},
        {id: 2, name: 'Grote zaal', private: false, dayPrice: 250},
        {id: 3, name: 'CM vergaderzaal', private: true, dayPrice: 0},
    ]

    return <main className={"w-full min-h-[100svh]"}>
        <div className={"p-4 block sm:flex items-center justify-between"}>
            <div className={"w-full mb-1"}>
                <div className={"mb-4"}>
                    <h1 className={"text-2xl font-semibold text-gray-900 sm:text-3xl"}>Instellingen</h1>
                </div>
                <div className={"grid sm:grid-cols-2 grid-cols-1 gap-4"}>
                    <form
                        className={"grid grid-cols-2 w-full gap-4 p-4 my-4 border border-gray-200 rounded-lg shadow-sm max-h-60"}>
                        <label
                            className={" my-auto font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-4 "}
                        >Naam</label>
                        <input
                            className={"h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                            id="productNaam" type={"text"} required
                            value={zaal[0].name}/>
                        <label
                            className={"my-auto font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-4 "}
                        >Kan geboekt worden</label>
                        <Switch checked={zaal[0].private}/>
                        <div
                            className={"col-span-2 grid grid-cols-3 gap-1 w-full p-1 my-1 border border-gray-200 rounded-full shadow-sm bg-green-100"}>
                            <Link href={`/dashboard/zalen/${zaal[0].id}/1`} id={"1"}
                                  className={"flex justify-center p-1 w-full border border-gray-200 rounded-full shadow-sm bg-green-200 hover:bg-green-300"}>VM: &euro; 70</Link>
                            <Link href={`/dashboard/zalen/${zaal[0].id}/2`} id={"2"}
                                  className={"flex justify-center p-1 w-full border border-gray-200 rounded-full shadow-sm bg-green-200 hover:bg-green-300"}>NM: &euro; 70</Link>
                            <Link href={`/dashboard/zalen/${zaal[0].id}/3`} id={"3"}
                                  className={"flex justify-center p-1 w-full border border-gray-200 rounded-full shadow-sm bg-green-200 hover:bg-green-300"}>AV: &euro; 70</Link>
                        </div>
                        <div className={"col-span-2 flex flex-row justify-between"}>
                            <Link href={"/dashboard/zalen/"}
                                  className={"items-center px-3 py-2 text-sm font-medium text-center rounded-lg bg-green-200 hover:bg-green-300 focus:ring-4 focus:ring-green-300"}>Terug</Link>
                            <Link href={"/dashboard/zalen/"}
                                  className={"items-center px-3 py-2 text-sm font-medium text-center rounded-lg bg-green-200 hover:bg-green-300 focus:ring-4 focus:ring-green-300"}>Opslaan</Link>
                        </div>
                    </form>
                    <div className={"bg-gray-200 flex-grow h-72 rounded p-2"}>React Kalender</div>
                </div>
            </div>
        </div>
    </main>;
}
