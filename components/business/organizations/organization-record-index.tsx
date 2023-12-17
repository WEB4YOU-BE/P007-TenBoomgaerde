"use client"
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import React from "react";
import {Edit, Trash} from "lucide-react";
import {Delete} from "@/components/business/delete";
import Link from "next/link";

interface OrganizationRecordIndexProps {
    id: string;
    name: string;
    btwNumber: string;
    tableName: string;
}

export default async function OrganizationRecordIndex({id, name, btwNumber, tableName}: OrganizationRecordIndexProps) {
    return <tr className={"hover:bg-muted whitespace-nowrap"}>
        <OrganizationRecordDatapoint>{name}</OrganizationRecordDatapoint>
        <OrganizationRecordDatapoint>{btwNumber}</OrganizationRecordDatapoint>
        <OrganizationRecordDatapoint><OrganizationRecordIndexActions id={id}
                                                                     tableName={tableName}/></OrganizationRecordDatapoint>
    </tr>
}

interface OrganizationRecordDatapointProps {
    children?: React.ReactNode;
}

async function OrganizationRecordDatapoint({children}: OrganizationRecordDatapointProps) {
    return <td
        className={"px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"}>{children}</td>
}

interface OrganizationRecordIndexActionsProps {
    id: string;
    tableName: string;
}

async function OrganizationRecordIndexActions({id, tableName}: OrganizationRecordIndexActionsProps) {
    const handleDelete = async () => {
        await Delete({id, tableName})
    }

    return <div className={"flex flex-row gap-2 flex-shrink-0"}>
        <Link href={`/dashboard/organisaties/${id}`}
              className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2 flex-shrink-0")}><Edit
            size={16}/><span className={"max-sm:hidden"}>Bewerk</span></Link>
        <button onClick={handleDelete}
                className={cn(buttonVariants({variant: "destructive"}), "flex flex-row gap-2 flex-shrink-0")}><Trash
            size={16}/><span className={"max-sm:hidden"}>Verwijder</span></button>
    </div>
}