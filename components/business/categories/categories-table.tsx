import {Tables} from "@/lib/database.types";
import CategoryRecordIndex from "@/components/business/categories/category-record-index";

interface CategoriesTableProps {
    categories: Tables<"categories">[];
}

export default async function CategoriesTable({categories}: CategoriesTableProps) {
    return <div className={"max-w-[100dvw] md:max-w-[calc(100dvw-320px)] overflow-x-auto"}>
        <table className={"w-full"}>
            <thead>
            <tr className={"bg-muted"}>{
                ["Naam", "Acties"]
                    .map((title, index) => <th key={index}
                                               className={"px-4 py-2 text-left font-bold uppercase text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right shrink-0 truncate"}>{title}</th>)
            }</tr>
            </thead>
            <tbody className={"divide-y divide-muted"}>{
                categories
                    .map((category) =>
                        <CategoryRecordIndex id={category.id} name={category.name}/>)
            }</tbody>
        </table>
    </div>
}