import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {buttonVariants} from "@/components/ui/button";

export default async function AddRoomForm() {
    const onCreateRoom = async (formData: FormData) => {
        "use server"
        const name = formData.get("name")

        if (!name) return;

        const supabase = createServerComponentClient({cookies})
        //await supabase.from("rooms").insert({})
    }

    return <form action={onCreateRoom} method={"POST"} className={"flex flex-col gap-2"}>
        <div>
            <label htmlFor={"name"} className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Naam</label>
            <input autoFocus required id={"name"} name={"name"} placeholder={"Kleine zaal"}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"price"} className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Prijs</label>
            <input type={"number"} step={0.01} min={0} required id={"price"} name={"price"} placeholder={"5.00"}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        {/*
        <div>
            <label className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Categorie</label>
            <input
                className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        */}
        <div className={"flex items-center text-current gap-2"}>
            <input type={"checkbox"} id={"forSale"} name={"forSale"}
                   className={"peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"}/>
            <label htmlFor={"forSale"} className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Is te koop?</label>
        </div>
        <button type={"submit"} className={buttonVariants()}>Maak aan</button>
    </form>
    /*return <form className={"grid w-full items-center gap-4"}>
        <div className={"flex flex-col space-y-1.5"}>
            <label
                className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}
            >Naam</label>
            <input
                className={"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                id="productNaam" type={"text"} required autoFocus
                placeholder="Naam van het product"/>
        </div>
        <div className={"flex flex-col space-y-1.5"}>
            <label
                className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}
            >Prijs</label>
            <input
                className={"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                id="prijs" type={"number"} required autoFocus
                placeholder="0,00"/>
        </div>
        <div className={"flex flex-col space-y-1.5"}>
            <div className={"flex flex-row"}>
                <label
                    className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}
                >Categorie</label>
            </div>
            <input
                className={"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                id="categorie" type={"text"} required autoFocus
                placeholder="Categorie"/>
        </div>
        <div className="flex flex-row space-y-1.5">
            <label
                className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}
            >Te koop?</label>
            <input
                className={"w-full h-5 items-center block rounded-md border border-input bg-transparent px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                id="tekoop" type={"checkbox"} autoFocus/>
        </div>
        <div>
            <div className={"items-center justify-between block"}>
                <div className={"flex items-center space-x-3"}>
                    <button type={"submit"}
                            className={"inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center rounded-lg bg-green-200 hover:bg-green-300"}>
                        Opslaan en nieuwe toevoegen
                    </button>
                    <div className={"inline-flex items-center w-1/2 justify-center px-3 py-2 text-sm font-medium text-center rounded-lg bg-green-200 hover:bg-green-300"}>
                        <button type={"submit"}>Product opslaan en afsluiten</button>
                    </div>
                </div>
            </div>
        </div>
    </form>*/
}