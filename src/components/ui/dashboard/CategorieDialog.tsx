import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/Dialog";


const CategorieDialog = async () => {
    return <DialogContent>
        <DialogHeader>
            <DialogTitle>Categorie toevoegen</DialogTitle>
            <DialogDescription>
                Een categorie toevoegen
            </DialogDescription>
        </DialogHeader>
        <form id={"categorie-form"} className={"grid w-full items-center gap-4"}>
            <div className={"flex flex-col space-y-1.5"}>
                <label
                    className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}
                >Naam</label>
                <input
                    className={"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                    id="categorieNaam" type={"text"} required autoFocus
                    placeholder="Naam van de categorie"/>
            </div>
            <DialogFooter className={"mt-5"}>
                <DialogClose
                    className={"px-3 py-2 text-sm font-medium text-center rounded-lg bg-green-200 hover:bg-green-300"}>Opslaan
                </DialogClose>
            </DialogFooter>
        </form>
    </DialogContent>
}

export default CategorieDialog;
