import {redirect} from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {cookies} from "next/headers";
import {RedirectType} from "next/dist/client/components/redirect";
import {buttonVariants} from "@/components/atoms/button";
import {DbResult} from "@/lib/database.types";
import Link from "next/link";
import { cn } from "@/utils/tailwindcss/MergeCN";

interface OrganizationIndexProps {
    id: string;
}

export default async function ChangeOrganizationForm({id}: OrganizationIndexProps) {
    const onChangeOrganization = async (formData: FormData) => {
        "use server"
        const name = formData.get("name")
        const btwNumber = formData.get("btwNumber")

        if (name === null) redirect("/name")
        if (btwNumber === null) redirect("/name")

        const supabase = createClient()
        await supabase.from("organizations").update({name: name, btw_number: btwNumber}).eq('id', id)

        redirect("/dashboard/organisaties", RedirectType.push)
    }

    const supabase = createClient()
    const query = supabase.from("organizations").select().eq('id', id)
    const organization: DbResult<typeof query> = await query

    if (!organization.data) return undefined

    return <form action={onChangeOrganization} className={"flex flex-col gap-2"}>
        <div>
            <label htmlFor={"name"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>Naam</label>
            <input autoFocus required id={"name"} name={"name"} defaultValue={organization.data[0].name}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div>
            <label htmlFor={"btwNumber"}
                   className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>BTW-nummer</label>
            <input autoFocus required id={"btwNumber"} name={"btwNumber"} defaultValue={organization.data[0].btw_number}
                   className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}/>
        </div>
        <div className={"grid lg:grid-cols-2 gap-4 mt-4"}>
            <Link href={"/dashboard/organisaties"} className={buttonVariants({variant: "secondary"})}>Terug</Link>
            <button type={"submit"} className={cn(buttonVariants({variant: "green"}), "max-sm:row-start-1")}>Wijzig
            </button>
        </div>
    </form>
}