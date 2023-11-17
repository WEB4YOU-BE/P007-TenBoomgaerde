interface OrganizationsTableProps {
    //organisations: Tables<"organisations">[];
}

export default async function OrganizationsTable({}: OrganizationsTableProps) {
    return <div className={"max-w-[100dvw] md:max-w-[calc(100dvw-320px)] overflow-x-auto"}>
        <table className={"w-full"}>
            <thead>
            <tr className={"bg-muted"}>{
                ["Naam", "BTW-nummer", "Acties"]
                    .map((title, index) => <th key={index}
                                               className={"px-4 py-2 text-left font-bold uppercase text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right shrink-0 truncate"}>{title}</th>)
            }</tr>
            </thead>
            <tbody className={"divide-y divide-muted"}>{/*
                organisations
                    .map((organisation) =>
                        <OrganizationRecordIndex id={organisation.id} name={organisation.name} btwNummer={organisation.btwNumber} tableName={"organisations"}/>)
            */}</tbody>
        </table>
    </div>
}