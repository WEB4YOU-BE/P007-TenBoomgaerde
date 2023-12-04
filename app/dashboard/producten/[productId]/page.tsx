import ChangeProductForm from "@/components/business/products/change-product-form";


export default async function page({params}: { params: { productId: string } }) {
    return <main className={"mx-auto md:max-w-screen-sm p-2 flex flex-col gap-2"}>
        <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow whitespace-nowrap truncate pb-2"}>Categorie
            wijzigen</h1>
        <ChangeProductForm id={params.productId}/>
    </main>;
}