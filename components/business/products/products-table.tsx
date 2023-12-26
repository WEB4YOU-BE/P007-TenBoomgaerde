'use client'
import {Tables} from "@/lib/database.types";
import ProductRecordIndex from "@/components/business/products/product-record-index";
import {useEffect, useState} from "react";
import supabase from "@/lib/supabase";

interface ProductsTableProps {
    serverProducts: Tables<"products">[];
}

type product = Tables<"products">

export default function ProductsTable({serverProducts}: ProductsTableProps) {
    const [products, setProducts] = useState(serverProducts)

    useEffect(() => {
        const channel = supabase.channel('realtime products').on('postgres_changes', {
                event: '*', schema: 'public', table: 'products'
            }, (payload) => {
                if (payload.eventType === "DELETE") {
                    setProducts(prods => {
                        return prods.filter(item => item.id !== payload.old.id)
                    })
                } else if (payload.eventType === "UPDATE") {
                    setProducts(prods => {
                        // Index zoeken van object op basis van id
                        const index = prods.findIndex(item => item.id === payload.new.id);
                        // Als object is gevonden, updaten anders array niet veranderen
                        if (index !== -1) {
                            const updatedProducts = [...prods];
                            updatedProducts[index] = payload.new as product;
                            return updatedProducts;
                        } else {
                            return products;
                        }
                    })
                } else {
                    setProducts([...products, payload.new as product])
                }
            }
        ).subscribe();
        return () => {
            void supabase.removeChannel(channel)
        }
    }, [supabase, setProducts, products]);
    return <div className={"max-w-[100dvw] md:max-w-[calc(100dvw-320px)] overflow-x-auto"}>
        <table className={"min-w-full divide-y divide-gray-200 table-fixed max-sm:text-sm"}>
            <thead>
            <tr className={"bg-muted max-sm:[&>*:nth-child(4)]:hidden"}>{
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