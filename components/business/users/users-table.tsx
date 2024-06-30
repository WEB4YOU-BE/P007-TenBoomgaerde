import { Tables } from "@/types/supabase/database.types";
import UserRecordIndex from "@/components/business/users/user-record-index";

interface UserTableProps {
  users: Tables<"users">[];
}

export default async function UsersTable({ users }: UserTableProps) {
  return (
    <div
      className={"max-w-[100dvw] overflow-x-auto md:max-w-[calc(100dvw-320px)]"}
    >
      <table className={"w-full max-sm:text-sm"}>
        <thead>
          <tr
            className={
              "bg-muted max-sm:[&>*:nth-child(1)]:hidden max-sm:[&>*:nth-child(3)]:hidden max-sm:[&>*:nth-child(4)]:hidden max-sm:[&>*:nth-child(5)]:hidden max-sm:[&>*:nth-child(6)]:hidden"
            }
          >
            {[
              "Naam",
              "Email",
              "Gsm",
              "City",
              "Type",
              "Beheerder",
              "Acties",
            ].map((title, index) => (
              <th
                key={index}
                className={
                  "shrink-0 truncate px-4 py-2 text-left font-bold uppercase text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right"
                }
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={"divide-y divide-muted"}>
          {users.map((user, index) => (
            <UserRecordIndex
              key={index}
              id={user.id}
              firstname={user.firstname}
              lastname={user.lastname}
              isAdmin={user.is_admin}
              email={user.email}
              phone={user.phone}
              city={user.city}
              type={user.type}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
