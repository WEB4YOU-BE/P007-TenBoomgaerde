import RoomRecordIndex from "@/components/business/rooms/room-record-index";
import {Tables} from "@/lib/database.types";

interface RoomsTableProps {
    rooms: Tables<"rooms">[];
}

export default async function RoomsTable({rooms}: RoomsTableProps) {
    return <div className={"max-w-[100dvw] md:max-w-[calc(100dvw-320px)] overflow-x-auto"}>
        <table className={"w-full max-sm:text-sm"}>
            <thead>
            <tr className={"bg-muted max-sm:[&>*:nth-child(3)]:hidden"}>{
                ["Naam", "Is privé", "Prijs", "Acties"]
                    .map((title, index) => <th key={index}
                                               className={"px-4 py-2 text-left font-bold uppercase text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right shrink-0 truncate"}>{title}</th>)
            }</tr>
            </thead>
            <tbody className={"divide-y divide-muted"}>{
                rooms
                    .map((room, index) =>
                        <RoomRecordIndex key={index} id={room.id} name={room.name} isPrivate={room.private}
                                         pricePerDay={room.day_price} tableName={"rooms"}/>)
            }</tbody>
        </table>
    </div>
}