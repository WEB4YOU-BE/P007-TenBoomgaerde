import {Tables} from "@/lib/database.types";
import ProductRecordIndex from "@/components/business/products/product-record-index";

interface ProductsTableProps {
    products: Tables<"products">[];
}

export default async function ProductsTable({products}: ProductsTableProps) {
    return <div className={"max-w-[100dvw] md:max-w-[calc(100dvw-320px)] overflow-x-auto"}>
        <table className={"min-w-full divide-y divide-gray-200 table-fixed"}>
            <thead>
            <tr className={"bg-muted"}>{
                ['Naam', 'Prijs', 'Categorie', 'Te koop', 'Acties']
                    .map((title, index) => <th key={index} scope={"col"}
                                               className={"px-4 py-2 text-left font-bold uppercase text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right shrink-0 truncate"}>{title}</th>)
            }</tr>
            </thead>
            <tbody className={"divide-y divide-muted"}>{
                products
                    .map((product, index) =>
                        <ProductRecordIndex key={index} id={product.id} name={product.name} price={product.price}
                                            forSale={!!product.for_sale} categories={product.categories}
                                            tableName={"products"}/>)
            }</tbody>
        </table>
    </div>
}