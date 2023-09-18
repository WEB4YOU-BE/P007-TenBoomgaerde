import AddProductForm from "@/components/business/products/add-product-form";

export default async function page() {
    return <main className={"mx-auto md:max-w-screen-sm p-2 flex flex-col gap-2"}>
        <h1 className={"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow flex-shrink-0"}>Voeg
            een product toe</h1>
        <AddProductForm/>
    </main>
}