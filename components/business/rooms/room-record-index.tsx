"use client"
import {buttonVariants} from "@/components/ui/button";
import {Edit, Trash} from "lucide-react";
import {cn} from "@/lib/utils";
import React from "react";
import {Delete} from "@/components/business/delete";

interface RoomRecordIndexProps {
    id: string;
    name?: string;
    isPrivate?: boolean;
    pricePerDay: number | null;
    tableName: string;
}

export default async function RoomRecordIndex({id, name, isPrivate, pricePerDay, tableName}: RoomRecordIndexProps) {
    return <tr className={"hover:bg-muted whitespace-nowrap"}>
        <RoomRecordDatapoint>{name}</RoomRecordDatapoint>
        <RoomRecordDatapoint>{isPrivate ? "ja" : "nee"}</RoomRecordDatapoint>
        <RoomRecordDatapoint>&euro;{pricePerDay}</RoomRecordDatapoint>
        <RoomRecordDatapoint><RoomRecordIndexActions id={id} tableName={tableName}/></RoomRecordDatapoint>
    </tr>
}

interface RoomRecordDatapointProps {
    children?: React.ReactNode;
}

async function RoomRecordDatapoint({children}: RoomRecordDatapointProps) {
    return <td className={"px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"}>{children}</td>
}

interface RoomRecordIndexActionsProps {
    id: string;
    tableName: string;
}

async function RoomRecordIndexActions({id, tableName}: RoomRecordIndexActionsProps) {
    const handleDelete = async () => {
        await Delete({id, tableName})
    }

    return <div className={"flex flex-row gap-2 flex-shrink-0"}>
        <button className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2 flex-shrink-0")}><Edit size={16}/><span>Bewerk</span></button>
        <button onClick={handleDelete}
                className={cn(buttonVariants({variant: "destructive"}), "flex flex-row gap-2 flex-shrink-0")}><Trash
            size={16}/><span>Verwijder</span></button>
    </div>
}