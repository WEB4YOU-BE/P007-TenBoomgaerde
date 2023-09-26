"use client"
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import React from "react";
import {Edit, Trash} from "lucide-react";
import {deleteCategory} from "@/components/business/categories/delete_category";

interface CategoryRecordIndexProps {
    id: string;
    name?: string;
}

export default async function CategoryRecordIndex({id, name}: CategoryRecordIndexProps) {
    return <tr className={"hover:bg-muted whitespace-nowrap"}>
        <CategoryRecordDatapoint>{name}</CategoryRecordDatapoint>
        <CategoryRecordDatapoint><CategoryRecordIndexActions id={id}/></CategoryRecordDatapoint>
    </tr>
}

interface CategoryRecordDatapointProps {
    children?: React.ReactNode;
}

async function CategoryRecordDatapoint({children}: CategoryRecordDatapointProps) {
    return <td className={"px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"}>{children}</td>
}

interface CategoryRecordIndexActionsProps {
    id: string;
}

async function CategoryRecordIndexActions({id}: CategoryRecordIndexActionsProps) {
    const handleDelete = async () => {
        await deleteCategory({id})
    }

    return <div className={"flex flex-row gap-2 flex-shrink-0"}>
        <button className={cn(buttonVariants({variant: "green"}), "flex flex-row gap-2 flex-shrink-0")}><Edit size={16}/><span>Bewerk</span></button>
        <button onClick={handleDelete}
                className={cn(buttonVariants({variant: "destructive"}), "flex flex-row gap-2 flex-shrink-0")}><Trash
            size={16}/><span>Verwijder</span></button>
    </div>
}