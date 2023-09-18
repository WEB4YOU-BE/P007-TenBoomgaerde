import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Edit, Trash} from "lucide-react";
import React from "react";

interface ProductRecordIndexProps {
    id: string;
    name?: string;
    price?: number | null;
    forSale?: boolean;
    categorieId: string | null;
}


export default async function ProductRecordIndex({id, name, price, forSale, categorieId}: ProductRecordIndexProps) {
    return <tr className={"hover:bg-muted shrink-0 truncate"}>
        <ProductRecordDatapoint>{name}</ProductRecordDatapoint>
        <ProductRecordDatapoint>&euro;{price}</ProductRecordDatapoint>
        <ProductRecordDatapoint>{categorieId}</ProductRecordDatapoint>
        <ProductRecordDatapoint>
            <input id={`checkbox-${forSale}`} checked={!!forSale} readOnly aria-describedby={"checkbox-1"} type={"checkbox"}
                   className={"w-3 sm:w-4 h-3 sm:h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"}/>
        </ProductRecordDatapoint>
        <ProductRecordDatapoint><ProductRecordIndexActions id={id}/></ProductRecordDatapoint>
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
}

async function ProductRecordIndexActions({id}: ProductRecordIndexActionsProps) {
    return <div className={"flex flex-row gap-2 flex-shrink-0"}>
        <button className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2 flex-shrink-0")}><Edit size={16}/><span>Bewerk</span></button>
        <button className={cn(buttonVariants({variant: "destructive"}), "flex flex-row gap-2 flex-shrink-0")}><Trash size={16}/><span>Verwijder</span></button>
    </div>
}