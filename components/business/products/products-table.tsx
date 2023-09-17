import {Tables} from "@/lib/database.types";
import ProductRecordIndex from "@/components/business/products/product-record-index";

interface ProductsTableProps {
    products: Tables<"products">[];
}

export default async function ProductsTable({products}: ProductsTableProps) {
    return <div className={"max-w-[100dvw] overflow-x-auto"}>
        <div className={"inline-block min-w-full align-middle"}>
            <div className={"overflow-hidden shadow"}>
                <table className={"min-w-full divide-y divide-gray-200 table-fixed"}>
                    <thead className={"bg-gray-100"}>
                    <tr>
                        {
                            [
                                'Naam',
                                'Prijs',
                                'Categorie',
                                'Koop',
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
                    {products.map((product) =>
                        <ProductRecordIndex id={product.id} name={product.name} forSale={!!product.for_sale}
                                            category={product.categorie_id} price={product.price}/>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}