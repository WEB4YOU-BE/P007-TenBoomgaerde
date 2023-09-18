import AddCategoryForm from "@/components/business/categories/add-category-form";

export default async function page() {
    return <main className={"mx-auto md:max-w-screen-sm p-2 flex flex-col gap-2"}>
        <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl md:flex-grow whitespace-nowrap truncate"}>Voeg een categorie toe</h1>
        <AddCategoryForm/>
    </main>;
}