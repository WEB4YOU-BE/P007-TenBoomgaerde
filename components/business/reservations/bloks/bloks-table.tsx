import {Tables} from "@/lib/database.types";
import BlokRecordIndex from "@/components/business/reservations/bloks/blok-record-index";

interface BloksTableProps {
    bloks: Tables<"bloks">[];
}

export default async function BloksTable({bloks}: BloksTableProps) {
    return <div className={"max-w-[100dvw] md:max-w-[calc(100dvw-320px)] overflow-x-auto"}>
        <table className={"min-w-full divide-y divide-gray-200 table-fixed max-sm:text-sm"}>
            <thead>
            <tr className={"bg-muted max-sm:[&>*:nth-child(4)]:hidden"}>
                {
                    ['Naam', 'Begin uur', 'Eind uur', 'Prijs', 'Acties']
                        .map((title, index) => <th key={index} scope={"col"}
                                                   className={"px-4 py-2 text-left font-bold uppercase text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right shrink-0 truncate"}>{title}</th>)
                }
            </tr>
            </thead>
            <tbody className={"divide-y divide-muted"}>
            {
                bloks.map((blok, index) =>
                    <BlokRecordIndex key={index} id={blok.id} name={blok.name} startHour={blok.start_hour}
                                     endHour={blok.end_hour} price={blok.price} tableName={"bloks"}/>)
            }
            </tbody>
        </table>
    </div>
}