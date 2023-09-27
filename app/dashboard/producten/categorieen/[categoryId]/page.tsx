import ChangeCategoryForm from "@/components/business/categories/change-category-form";


export default async function page({params}: { params: { categoryId: string } }) {
    return <main className={"mx-auto md:max-w-screen-sm p-2 flex flex-col gap-2"}>
        <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow whitespace-nowrap truncate"}>Categorie
            wijzigen</h1>
        <ChangeCategoryForm id={params.categoryId}/>
    </main>;
}