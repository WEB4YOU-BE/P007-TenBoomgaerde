import OrganizationRecordIndex from "@/components/business/organizations/organization-record-index";
import {Tables} from "@/lib/database.types";

interface OrganizationsTableProps {
    organizations: Tables<"organizations">[];
}

export default async function OrganizationsTable({organizations}: OrganizationsTableProps) {

    return <div className={"max-w-[100dvw] md:max-w-[calc(100dvw-320px)] overflow-x-auto"}>
        <table className={"w-full"}>
            <thead>
            <tr className={"bg-muted"}>{
                ["Naam", "BTW-nummer", "Acties"]
                    .map((title, index) => <th key={index}
                                               className={"px-4 py-2 text-left font-bold uppercase text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right shrink-0 truncate"}>{title}</th>)
            }</tr>
            </thead>
            <tbody className={"divide-y divide-muted"}>{
                organizations
                    .map((organization, index) =>
                        <OrganizationRecordIndex key={index} id={organization.id} name={organization.name}
                                                 btwNumber={organization.btw_number} tableName={"organizations"}/>)
            }</tbody>
        </table>
    </div>
}