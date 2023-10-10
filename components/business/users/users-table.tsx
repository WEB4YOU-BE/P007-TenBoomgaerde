import {Tables} from "@/lib/database.types";
import UserRecordIndex from "@/components/business/users/user-record-index";

interface UserTableProps {
    users: Tables<"users">[];
}

export default async function UsersTable({users}: UserTableProps) {
    return <div className={"max-w-[100dvw] md:max-w-[calc(100dvw-320px)] overflow-x-auto"}>
        <table className={"w-full"}>
            <thead>
            <tr className={"bg-muted"}>{
                ["Naam", "Email", "Gsm", "City", "Beheerder", "Acties"]
                    .map((title, index) => <th key={index}
                                               className={"px-4 py-2 text-left font-bold uppercase text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right shrink-0 truncate"}>{title}</th>)
            }</tr>
            </thead>
            <tbody className={"divide-y divide-muted"}>{
                users
                    .map((user, index) =>
                        <UserRecordIndex key={index} id={user.id} firstname={user.firstname} lastname={user.lastname}
                                         isAdmin={user.is_admin} email={user.email} phone={user.phone}
                                         city={user.city}/>)
            }</tbody>
        </table>
    </div>
}