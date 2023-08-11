import {Badge} from "@/components/ui/Badge";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/Hover-card";

const Reservation = async () => {
    return <div className={"p-4 border border-gray-200 rounded-lg shadow-sm"}>
        <div className={"grid gap-4 grid-cols-3 grid-rows-4"}>
            <div className={"font-bold text-xl row-start-1 col-span-2"}>
                Reservatienummer: <span>21457</span>
            </div>
            <span className={"flex justify-end text-sm"}>
                <Badge variant={"success"}>Goedgekeurd</Badge>
            </span>
            <div className={"sm:row-start-2 col-span-3 sm:col-span-2"}>
                <span className={"font-bold"}>Reserveerder: </span>
                <span>Tiebe Deweerdt</span>
            </div>
            <div className={"sm:row-start-3 col-span-3 sm:col-span-2"}>
                <span className={"font-bold"}>Datum: </span>
                <span>11-08-2023 van 13:00 tot 21:00</span>
            </div>
            <div className={"sm:row-start-4 col-span-3 sm:col-span-2"}>
                <span className={"font-bold"}>Zaal: </span>
                <span>Grote zaal</span>
            </div>
            <div className={"sm:row-start-3 col-span-3 sm:col-span-1"}>
                <HoverCard>
                    <HoverCardTrigger className={"font-bold"}>GSM'nr voor poort: </HoverCardTrigger>
                    <HoverCardContent>Dit gsm'nr wordt gebruikt om de poort open te bellen.</HoverCardContent>
                </HoverCard>
                <span>+32 471 71 09 91</span>
            </div>
            <div className={"sm:row-start-4 col-span-3 sm:col-span-1"}>
                <span className={"font-bold"}>Code sleutel: </span>
                <HoverCard>
                    <HoverCardTrigger>Nog niet bekend</HoverCardTrigger>
                    <HoverCardContent>Deze code komt de zondag voor uw reservatie online.</HoverCardContent>
                </HoverCard>
            </div>
        </div>
    </div>
}

export default Reservation;
