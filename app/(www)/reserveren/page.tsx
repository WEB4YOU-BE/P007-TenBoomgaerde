import GroteZaal from "@/components/Calendar/grote-zaal";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/Select";

export default async function Index() {
    return <main className={"w-full min-h-[calc(100svh-72px)]"}>
        <div className={" container max-w-screen-xl mx-auto p-2 px-4"}>
            <h1 className={"text-3xl font-bold"}>Reserveren</h1>
            <Select>
                <SelectTrigger className={"w-[180px] my-4"}>
                    <SelectValue placeholder={"Kies uw zaal"}/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={"Kleine zaal"}>Kleine zaal</SelectItem>
                    <SelectItem value={"Grote zaal"}>Grote zaal</SelectItem>
                    <SelectItem value={"Beide zalen"}>Beide zalen</SelectItem>
                </SelectContent>
            </Select>
            <GroteZaal/>
        </div>
    </main>;
}
