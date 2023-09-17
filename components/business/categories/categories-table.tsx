import {Tables} from "@/lib/database.types";
import CategoryRecordIndex from "@/components/business/categories/category-record-index";

interface CategoriesTableProps {
    categories: Tables<"categories">[];
}

export default async function CategoriesTable({categories}: CategoriesTableProps) {
    return <div className={"max-w-[100dvw] overflow-x-auto"}>
        <div className={"inline-block min-w-full align-middle"}>
            <div className={"overflow-hidden shadow"}>
                <table className={"min-w-full divide-y divide-gray-200 table-fixed"}>
                    <thead className={"bg-gray-100"}>
                    <tr>
                        {
                            [
                                'Naam',
                                'Acties'
                            ].map((th, index) => (
                                <th key={index} scope={"col"}
                                    className={"py-4 pl-3 pr-4 text-xs font-medium text-left text-gray-500 uppercase"}>
                                    {th}
                                </th>
                            ))
                        }
                    </tr>
                    </thead>
                    <tbody className={"divide-y divide-gray-200"}>
                    {categories.map((category) =>
                        <CategoryRecordIndex id={category.id} name={category.name}/>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}