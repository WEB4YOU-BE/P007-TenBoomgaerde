import {SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle} from "@/components/ui/Sheet";

const ZaalAside = async () => {
    return <SheetContent>
        <SheetHeader>
            <SheetTitle>Zaal toevoegen</SheetTitle>
            <SheetDescription>
                Voeg hier je zaal toe.
            </SheetDescription>
        </SheetHeader>
        <form id={"zaal-form"} className={"grid w-full items-center gap-4"}>
            <div className={"flex flex-col space-y-1.5"}>
                <label
                    className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}
                >Naam</label>
                <input
                    className={"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                    id="zaalNaam" type={"text"} required autoFocus
                    placeholder="Naam van de zaal"/>
            </div>
            <div className={"flex flex-col space-y-1.5"}>
                <label
                    className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}
                >Prijs</label>
                <input
                    className={"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                    id="zaalPrijs" type={"number"} required autoFocus
                    placeholder="0,00"/>
            </div>
            <div className="flex flex-row space-y-1.5">
                <label
                    className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}
                >Openbaar?</label>
                <input
                    className={"w-full h-5 items-center block rounded-md border border-input bg-transparent px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                    id="tekoop" type={"checkbox"} autoFocus/>
            </div>
            <div>
                <SheetFooter className={"items-center justify-between block"}>
                    <div className={"flex items-center space-x-3"}>
                        <button type={"submit"}
                                className={"inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center rounded-lg bg-green-200 hover:bg-green-300"}>
                            Opslaan en nieuwe toevoegen
                        </button>
                        <SheetClose asChild
                                    className={"inline-flex items-center w-1/2 justify-center px-3 py-2 text-sm font-medium text-center rounded-lg bg-green-200 hover:bg-green-300"}>
                            <button type={"submit"}>Product opslaan en afsluiten</button>
                        </SheetClose>
                    </div>
                </SheetFooter>
            </div>
        </form>
    </SheetContent>
}

export default ZaalAside;
