"use client"

import React from "react";
import {Delete} from "@/components/business/delete";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {Edit, Trash} from "lucide-react";

interface BlokRecordIndexProps {
    id: string;
    name?: string;
    startHour: string;
    endHour: string;
    tableName: string;
}

export default async function BlokRecordIndex({id, name, startHour, endHour, tableName}: BlokRecordIndexProps) {
    return <tr className={"hover:bg-muted shrink-0 truncate max-sm:[&>*:nth-child(4)]:hidden"}>
        <BlokRecordDatapoint>{name}</BlokRecordDatapoint>
        <BlokRecordDatapoint>{startHour.substring(0, 5)}</BlokRecordDatapoint>
        <BlokRecordDatapoint>{endHour.substring(0, 5)}</BlokRecordDatapoint>
        <BlokRecordDatapoint><BlokRecordIndexActions id={id} tableName={tableName}/></BlokRecordDatapoint>
    </tr>
}

interface BlokRecordDatapointProps {
    children?: React.ReactNode;
}

async function BlokRecordDatapoint({children}: BlokRecordDatapointProps) {
    return <td
        className={"px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"}>{children}</td>
}

interface BlokRecordIndexActionsProps {
    id: string;
    tableName: string;
}

async function BlokRecordIndexActions({id, tableName}: BlokRecordIndexActionsProps) {
    const handleDelete = async () => {
        await Delete({id, tableName})
    }

    return <div className={"flex flex-row gap-2 flex-shrink-0"}>
        <Link href={`/dashboard/zalen/blokken/${id}`}
              className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2 flex-shrink-0")}><Edit
            size={16}/><span className={"max-sm:hidden"}>Bewerk</span></Link>
        <button onClick={handleDelete}
                className={cn(buttonVariants({variant: "destructive"}), "flex flex-row gap-2 flex-shrink-0")}><Trash
            size={16}/><span className={"max-sm:hidden"}>Verwijder</span></button>
    </div>
}