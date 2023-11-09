"use client"
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Edit, Trash} from "lucide-react";
import React from "react";
import {Delete} from "@/components/business/delete";
import Link from "next/link";

interface ProductRecordIndexProps {
    id: string;
    name?: string;
    price?: number | null;
    forSale?: boolean;
    categories: { name: string };
    tableName: string;
}


export default async function ProductRecordIndex({
                                                     id,
                                                     name,
                                                     price,
                                                     forSale,
                                                     categories,
                                                     tableName
                                                 }: ProductRecordIndexProps) {
    return <tr className={"hover:bg-muted shrink-0 truncate max-sm:[&>*:nth-child(4)]:hidden"}>
        <ProductRecordDatapoint>{name}</ProductRecordDatapoint>
        <ProductRecordDatapoint>&euro;{price}</ProductRecordDatapoint>
        <ProductRecordDatapoint>{categories !== undefined ? categories.name : "niet toegekend"}</ProductRecordDatapoint>
        <ProductRecordDatapoint>
            <input id={`checkbox-${forSale}`} checked={!!forSale} readOnly aria-describedby={"checkbox-1"} type={"checkbox"}
                   className={"w-3 sm:w-4 h-3 sm:h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"}/>
        </ProductRecordDatapoint>
        <ProductRecordDatapoint><ProductRecordIndexActions id={id} tableName={tableName}/></ProductRecordDatapoint>
    </tr>
}

interface ProductRecordDatapointProps {
    children?: React.ReactNode;
}

async function ProductRecordDatapoint({children}: ProductRecordDatapointProps) {
    return <td className={"px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"}>{children}</td>
}

interface ProductRecordIndexActionsProps {
    id: string;
    tableName: string;
}

async function ProductRecordIndexActions({id, tableName}: ProductRecordIndexActionsProps) {
    const handleDelete = async () => {
        await Delete({id, tableName})
    }

    return <div className={"flex flex-row gap-2 flex-shrink-0"}>
        <Link href={`/dashboard/producten/${id}`}
              className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2 flex-shrink-0")}><Edit
            size={16}/><span className={"max-sm:hidden"}>Bewerk</span></Link>
        <button onClick={handleDelete}
                className={cn(buttonVariants({variant: "destructive"}), "flex flex-row gap-2 flex-shrink-0")}><Trash
            size={16}/><span className={"max-sm:hidden"}>Verwijder</span></button>
    </div>
}