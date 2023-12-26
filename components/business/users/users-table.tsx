'use client'
import {Tables} from "@/lib/database.types";
import UserRecordIndex from "@/components/business/users/user-record-index";
import {useEffect, useState} from "react";
import supabase from "@/lib/supabase";

interface UserTableProps {
    serverUsers: Tables<"users">[];
}

type user = Tables<"users">

export default function UsersTable({serverUsers}: UserTableProps) {
    const [users, setUsers] = useState(serverUsers)

    useEffect(() => {
        const channel = supabase.channel('realtime users').on('postgres_changes', {
                event: '*', schema: 'public', table: 'users'
            }, (payload) => {
                if (payload.eventType === "DELETE") {
                    setUsers(usr => {
                        return usr.filter(item => item.id !== payload.old.id)
                    })
                } else if (payload.eventType === "UPDATE") {
                    setUsers(usr => {
                        // Index zoeken van object op basis van id
                        const index = usr.findIndex(item => item.id === payload.new.id);
                        // Als object is gevonden, updaten anders array niet veranderen
                        if (index !== -1) {
                            const updatedUsers = [...usr];
                            updatedUsers[index] = payload.new as user;
                            console.log(updatedUsers)
                            return updatedUsers;
                        } else {
                            return usr;
                        }
                    })
                } else {
                    setUsers([...users, payload.new as user])
                }
            }
        ).subscribe();
        return () => {
            void supabase.removeChannel(channel)
        }
    }, [supabase, setUsers, users]);

    return <div className={"max-w-[100dvw] md:max-w-[calc(100dvw-320px)] overflow-x-auto"}>
        <table className={"w-full max-sm:text-sm"}>
            <thead>
            <tr className={"bg-muted max-sm:[&>*:nth-child(1)]:hidden max-sm:[&>*:nth-child(3)]:hidden max-sm:[&>*:nth-child(4)]:hidden max-sm:[&>*:nth-child(5)]:hidden max-sm:[&>*:nth-child(6)]:hidden"}>{
                ["Naam", "Email", "Gsm", "City", "Type", "Beheerder", "Acties"]
                    .map((title, index) => <th key={index}
                                               className={"px-4 py-2 text-left font-bold uppercase text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right shrink-0 truncate"}>{title}</th>)
            }</tr>
            </thead>
            <tbody className={"divide-y divide-muted"}>{
                users
                    .map((user, index) =>
                        <UserRecordIndex key={index} id={user.id} firstname={user.firstname} lastname={user.lastname}
                                         isAdmin={user.is_admin} email={user.email} phone={user.phone}
                                         city={user.city} type={user.type}/>)
            }</tbody>
        </table>
    </div>
}