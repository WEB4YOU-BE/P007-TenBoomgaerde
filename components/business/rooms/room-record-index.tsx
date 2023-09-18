import {buttonVariants} from "@/components/ui/button";
import {Edit, Trash} from "lucide-react";
import {cn} from "@/lib/utils";

interface RoomRecordIndexProps {
    id: string;
    name?: string;
    isPrivate?: boolean;
    pricePerDay: number | null;
}

export default async function RoomRecordIndex({id, name, isPrivate, pricePerDay}: RoomRecordIndexProps) {
    return <tr className={"m-0 border-t p-0 hover:bg-muted shrink-0 truncate"}>
        <td className={"px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"}>{name}</td>
        <td className={"px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"}>{isPrivate ? "ja" : "nee"}</td>
        <td className={"px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"}>€{pricePerDay}</td>
        <td className={"px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"}><RoomRecordIndexActions id={id}/></td>
    </tr>
}


interface RoomRecordIndexActionsProps {
    id: string;
}

export async function RoomRecordIndexActions({id}: RoomRecordIndexActionsProps) {
    return <div className={"flex flex-row gap-2 flex-shrink-0"}>
        <button className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2 flex-shrink-0")}><Edit size={16}/><span>Bewerk</span></button>
        <button className={cn(buttonVariants({variant: "destructive"}), "flex flex-row gap-2 flex-shrink-0")}><Trash size={16}/><span>Verwijder</span></button>
    </div>
}